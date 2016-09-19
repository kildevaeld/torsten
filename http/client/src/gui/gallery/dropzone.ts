
import {View, ViewOptions, events} from 'views';
import {addClass, removeClass} from 'orange.dom';

export interface DropZoneOptions extends ViewOptions {
}

@events({
    dragenter: '_onDragEnter',
    dragleave: '_onDragEnd',
    dragstart: '_onDragEnter',
    drop: '_onDrop',
    drag: '_onDragEnter',
    dragover: '_onDragEnter'
})
export class DropZone extends View<HTMLDivElement> {

    constructor(options: DropZoneOptions = {}) {
        super(options);

    }

   private _onDragEnter (e:DragEvent) {
       addClass(this.el, 'drag-enter')
       e.preventDefault()
       e.stopPropagation();
   }

   private _onDragEnd (e:DragEvent) {
       removeClass(this.el, 'drag-enter')
       e.preventDefault();
       e.stopPropagation();
   }

   private _onDrop(e:DragEvent) {
       removeClass(this.el, 'drag-enter')
       console.log('drop', e.dataTransfer.files)
       e.preventDefault();
       e.stopPropagation();
       this.triggerMethod('drop', e.dataTransfer.files[0]);
   }

}