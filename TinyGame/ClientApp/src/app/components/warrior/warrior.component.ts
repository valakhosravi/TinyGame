import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-warrior',
  templateUrl: './warrior.component.html',
  styleUrls: ['./warrior.component.scss']
})
export class WarriorComponent implements OnInit {
  @Input() data!: any;
  @Output() dragStateChange = new EventEmitter<any>();
  @Output() positionChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() position: any;
  @Input() canUserDragAndMove = true;

  constructor() { }

  ngOnInit(): void {
  }

  public start() {
    this.dragStateChange.emit(true);
  }

  public end() {
    this.dragStateChange.emit(false);
  }

  moving(event: any) {
    this.positionChange.emit(event.source.getFreeDragPosition());
  }
}
