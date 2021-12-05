import React, {
   Dispatch,
   SetStateAction,
   useState,
} from 'react';
import {Motion} from 'react-motion';
import {
   GestureResponderEvent,
   Pressable,
   StyleSheet,
   TouchableOpacity,
   View,
} from 'react-native';
import {
   createContext,
   useContext,
} from 'use-context-selector';
import {useTheme} from '../Theme';
import {LabelText} from './Text';

/**
 * @interface DraggableState
 * @description state parameters for the draggable list component
 */
interface DraggableState {
   isDragging: boolean;
   topDeltaY: number;
   touchY: number;
   draggedItemId: number;
}

/**
 * @description Initial values for draggable list component
 */
const initDragState: DraggableState = {
   isDragging: false,
   topDeltaY: 0,
   touchY: 0,
   draggedItemId: 0,
};
/** @description heights map for list elements initial value */
const initHeights: number[] = [];

/** @description function type for drag handle events */
type listItemTouchHandler = (
   event: GestureResponderEvent,
   id: number,
) => void;

/** @description function type for remove events */
type listItemRemoveHandler = (id: number) => void;

/**
 * @description context for draggable handle
 * in order, onTouch[Start, Move, End], onRemoveItem
 */
const context: [
   listItemTouchHandler,
   listItemTouchHandler,
   listItemTouchHandler,
   listItemRemoveHandler,
] = [() => {}, () => {}, () => {}, () => {}];
const DraggableContext = createContext(context);

/** @description base object for a list element */
type ItemType = {id: number};
type DataType = ItemType[];

/** @description props for draggable list component */
interface DraggableListProps {
   data: DataType;
   setData: Dispatch<SetStateAction<DataType>>;
   renderChild: (
      item: ItemType,
      ind: number,
   ) => React.ReactElement;
}

/**
 * @description DraggableList react component,
 * creates and maintains a list of elements
 * from the data and renderitem props.
 * items with a DragHandle component can be used
 * to re-order the list.
 * @param props @see DraggableListProps
 */
export const DraggableList: React.FC<DraggableListProps> = (
   props: DraggableListProps,
) => {
   //state
   const [dragState, setDragState] =
      useState(initDragState);
   const [heights, setHeights] = useState(initHeights);

   //dragHandlers
   const onTouchStart = (
      e: GestureResponderEvent,
      id: number,
   ) => {
      const {pageY, locationY} = e.nativeEvent;
      setDragState({
         topDeltaY: pageY - locationY,
         touchY: locationY,
         isDragging: true,
         draggedItemId: id,
      });
   };

   const onTouchMove = (
      e: GestureResponderEvent,
      _id: number,
   ) => {
      e.preventDefault();
      if (dragState.isDragging) {
         const {pageY} = e.nativeEvent;
         const touchY = pageY - dragState.topDeltaY;
         setDragState(s => ({...s, touchY: touchY}));
      }
   };

   const onTouchEnd = (
      e: GestureResponderEvent,
      _id: number,
   ) => {
      const {pageY} = e.nativeEvent;
      let touchY = pageY - dragState.topDeltaY;

      const fromRow = props.data.findIndex(
         i => i.id === dragState.draggedItemId,
      );

      let toRow: number;
      if (touchY < 0) {
         toRow = 0;
         for (let i = fromRow - 1; i >= 0; i--) {
            if ((touchY += heights[i]) > 0) {
               toRow = i;
               break;
            }
         }
      } else {
         toRow = heights.length;
         for (let i = fromRow; i < heights.length; i++) {
            if ((touchY -= heights[i]) < 0) {
               toRow = i;
               break;
            }
         }
      }

      if (fromRow !== toRow) {
         const newData = props.data.slice();
         const val = newData.splice(fromRow, 1)[0];
         newData.splice(toRow, 0, val);
         props.setData(newData);
      }

      setDragState(s => ({
         ...s,
         isDragging: false,
         topDeltaY: 0,
      }));
   };

   const onRemoveHandler = (id: number) => {
      const listIndex = props.data.findIndex(
         i => i.id === id,
      );
      setHeights(h => {
         const _h = h.slice();
         _h.splice(listIndex, 1);
         return _h;
      });
      props.setData(d => {
         const _d = d.slice();
         _d.splice(listIndex, 1);
         return _d;
      });
   };

   //calculate wrapper height
   const wrapperHeight =
      heights.reduce((pv, cv) => cv + pv, 0) || 10;

   //function to render a list item
   const mapRenderItems = (item: ItemType, ind: number) => {
      const style =
         dragState.draggedItemId === item.id &&
         dragState.isDragging
            ? {y: dragState.touchY}
            : {y: 0};
      return (
         <Motion style={style} key={item.id}>
            {({y}) => {
               const computedStyle = {
                  transform: [{translateY: y}],
                  zIndex:
                     item.id === dragState.draggedItemId
                        ? 99
                        : ind,
               };
               return (
                  <View
                     onLayout={e => {
                        const calculatedHeight =
                           e?.nativeEvent?.layout?.height;
                        setHeights(arr => {
                           const newArr = arr.slice();
                           if (!calculatedHeight) {
                              newArr.splice(ind, 1);
                           } else {
                              newArr[ind] =
                                 calculatedHeight;
                           }
                           return newArr;
                        });
                     }}
                     style={computedStyle}>
                     {props.renderChild(item, ind)}
                  </View>
               );
            }}
         </Motion>
      );
   };

   return (
      <DraggableContext.Provider
         value={[
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            onRemoveHandler,
         ]}>
         <View style={{height: wrapperHeight}}>
            {props.data.map(mapRenderItems)}
         </View>
      </DraggableContext.Provider>
   );
};

/**
 * @description Drag Handle component
 * should be used within a draggable list item,
 * this is where drag actions will be initiated from
 * @param props id of the containing item
 */
export const DragHandle: React.FC<ItemType> = (
   props: ItemType,
) => {
   const [
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _onRemove,
   ] = useContext(DraggableContext);

   const theme = useTheme();
   const color = {
      backgroundColor: theme.lowlight,
   };

   return (
      <Pressable
         onTouchStart={e => onTouchStart(e, props.id)}
         onTouchMove={e => onTouchMove(e, props.id)}
         onTouchEnd={e => onTouchEnd(e, props.id)}>
         <View style={[styles.dragHandle, color]}>
            <LabelText style={styles.dragText}>
               ::::
            </LabelText>
         </View>
      </Pressable>
   );
};

export const RemoveHandle: React.FC<ItemType> = (
   props: ItemType,
) => {
   const removeHandler = useContext(DraggableContext)[3];

   const theme = useTheme();
   const color = {
      backgroundColor: theme.lowlight,
   };

   return (
      <TouchableOpacity
         style={[styles.dragHandle, color]}
         onPress={() => removeHandler(props.id)}>
         <LabelText>X</LabelText>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   dragHandle: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
      width: 25,
      paddingLeft: 3,
      borderRadius: 2,
   },
   dragText: {
      transform: [{rotate: '90deg'}],
      alignSelf: 'center',
      fontSize: 16,
   },
});
