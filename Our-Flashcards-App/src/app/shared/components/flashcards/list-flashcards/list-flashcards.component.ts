import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { ComposeFlashcardsComponent } from 'src/app/modals/compose/compose-flashcards/compose-flashcards.component';
import { MainMyFlashcardPage } from 'src/app/pages/my-flashcard/main-my-flashcard/main-my-flashcard.page';
import { Flashcards, Flashcards_Data } from 'src/app/shared/models/flashcard.model';
import { AlertService } from 'src/app/shared/services/alert/alert.service';

@Component({
  selector: 'app-list-flashcards',
  templateUrl: './list-flashcards.component.html',
  styleUrls: ['./list-flashcards.component.scss'],
})
export class ListFlashcardsComponent {

  @Input() list: Flashcards[];

  constructor(
    private modalCtrl: ModalController,
    private mainFlashcards: MainMyFlashcardPage,

    private alert: AlertService,
  ) { }

  async edit(slidingItem:any, flashcards: Flashcards, index: number) {
    slidingItem.close();
    const modal = await this.modalCtrl.create({
      component: ComposeFlashcardsComponent,
      componentProps: {
        flashcards: flashcards,
      }
    });
    modal.onDidDismiss().then((saved: OverlayEventDetail) => {
      this.mainFlashcards.getData();
    });
    return modal.present();
  }

  @ViewChild('slidingItem') slideItem : ElementRef;

  delete(slidingItem:any, index: number) {
    this.alert.delete_StorageData(this.list, index)
      .then(result => {
        if(result) this.list = result;
        slidingItem.close();
      });
  }

  getLearnedLenth(data: Flashcards_Data[]) {
    let learnedLength = data.filter(card => card.learn == true).length;
    return learnedLength ? learnedLength : 0;
  }
}