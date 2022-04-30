import { Component, ElementRef, ViewChild } from '@angular/core';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { WarriorService } from './services/warrior.service';
import { Warrior } from './models/warrior';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('imageContainer') imageContainer!: ElementRef;

  public totalScore = 0;
  // public dragPosition = { x: (window.innerWidth / 2) - 80, y: 0 };
  public isImageDragged = false;
  public canUserDragAndMove = true;
  public isGameEnded = false;
  public warrior: Warrior | undefined;
  public warriors: Warrior[] = [];
  public enteredArea: string | undefined;
  public index = 0;
  moveingInterval!: any;

  public dragPosition = { x: (window.innerWidth / 2) - 80, y: 0 };
  private _dragPosition: any;

  constructor(
    private warriorService: WarriorService,
    private snackBar: MatSnackBar
  ) {
    this.warriorService.getWarriors().subscribe(
      (data: any) => {
        this.warriors = data;
        this.warrior = this.warriors[this.index];
        this.moveImageContainer();
      },
      error => {
        let snackBarRef = this.snackBar.open('Connection to server failed (make sure your API is running)');
        console.log('error', error);
      }
    );
  }

  ngOnInit() {
    setTimeout(() => {
      console.log('this.dragPosition', this.dragPosition);
    }, 3000);
  }

  public moveImageContainer() {
    this.moveingInterval = setInterval(() => {
      if (!this.isImageDragged && this.canUserDragAndMove && !this.isGameEnded) {
        if (this.dragPosition.y < window.innerHeight - 160) {
          this.dragPosition = {
            x: this.dragPosition.x,
            y: this.dragPosition.y + 2
          };
        } else {
          clearInterval(this.moveingInterval);
          this.totalScore -= 5;
          let snackBarRef = this.snackBar.open('Timeout: -5 score ❌', ' Dismiss', {
            duration: 3000
          });
          this.nextWarrior();
        }
      }
    }, 20);
  }

  updateDragPosition(event: any) {
    this._dragPosition = event;
    this.enteredArea = this.getEnteredArea(this._dragPosition);
    if (this.enteredArea && this.warrior) {
      this.moveImageToBox(this.enteredArea);
    }
  }

  public dragStateChanged(value: any) {
    this.isImageDragged = value;
    if (!this.isImageDragged) {
      this.ended();
    }
  }

  public moving(event: CdkDragMove) {
    const imagePosition = event.source.getFreeDragPosition();
    this.enteredArea = this.getEnteredArea(imagePosition);
    if (this.enteredArea && this.warrior) {
      this.moveImageToBox(this.enteredArea);
    }
  }
  calculateScore(warrior: Warrior, enteredArea: string) {
    if (warrior.nationality === enteredArea) {
      this.totalScore += 20;
      let snackBarRef = this.snackBar.open('Correct :+20 score ✔️', ' Dismiss', {
        duration: 3000
      });
    } else {
      this.totalScore -= 5;
      let snackBarRef = this.snackBar.open('Wrong: -5 score ❌', ' Dismiss', {
        duration: 3000
      });
    }
  }

  private getEnteredArea(position: { x: number, y: number }) {
    position.x = position.x + 80;
    position.y = position.y + 80;
    if (position.x < 400 && position.y < 300) {
      return 'Japanese';
    } else if (position.x > window.innerWidth - 400 && position.y < 300) {
      return 'Chinese';
    } else if (position.x < 400 && position.y > window.innerHeight - 300) {
      return 'Korean';
    } else if (position.x > window.innerWidth - 400 && position.y > window.innerHeight - 300) {
      return 'Thai';
    } else {
      return undefined;
    }
  }

  public started() {
    this.isImageDragged = true;
  }

  public ended() {
    if (this.warrior && this.enteredArea) {
      clearInterval(this.moveingInterval)
      this.calculateScore(this.warrior, this.enteredArea);
      this.nextWarrior();
    }
    this.isImageDragged = false;
  }

  private nextWarrior() {
    clearInterval(this.moveingInterval)
    setTimeout(() => {
      this.index++;
      if (this.index < this.warriors.length) {
        this.canUserDragAndMove = true;
        this.dragPosition = { x: (window.innerWidth / 2) - 80, y: 0 };
        this.moveImageContainer();
        this.warrior = this.warriors[this.index];
      } else {
        this.isGameEnded = true;
      }
    }, 1000);
  }

  private moveImageToBox(area: string) {
    this.canUserDragAndMove = false;
    switch (area) {
      case 'Japanese':
        this.dragPosition = {
          x: 0,
          y: 0
        };
        break;
      case 'Korean':
        this.dragPosition = {
          x: 0,
          y: window.innerHeight - 160
        };
        break;
      case 'Chinese':
        this.dragPosition = {
          x: window.innerWidth - 160,
          y: 0
        };
        break;
      case 'Thai':
        this.dragPosition = {
          x: window.innerWidth - 160,
          y: window.innerHeight - 160
        };
        break;
    }
  }

  public onRestartClick() {
    this.index = 0;
    this.totalScore = 0;
    this.dragPosition = { x: (window.innerWidth / 2) - 80, y: 0 };
    this.isImageDragged = false;
    this.canUserDragAndMove = true;
    this.isGameEnded = false
    this.warrior = this.warriors[this.index];
    clearInterval(this.moveingInterval)
    this.moveImageContainer();
  }
}
