import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Flashcards } from 'src/app/shared/models/flashcard.model';
import { Flashcards_item, initFlashcards } from 'src/app/shared/models/item.model';
import { DbService } from 'src/app/shared/services/db/db.service';

import { UtilService } from 'src/app/shared/services/util/util.service';

@Component({
  selector: 'app-compose-flashcards',
  templateUrl: './compose-flashcards.component.html',
  styleUrls: ['./compose-flashcards.component.scss'],
})
export class ComposeFlashcardsComponent {

  flashcards: Flashcards;
  tagInput: string;
  isEmojiPickerVisible: boolean;

  constructor(
    private modalCtrl: ModalController,
    // public data: Flashcards,
    public flashcards_item: Flashcards_item,

    private util: UtilService,
    ) {
      if (this.flashcards == null) this.flashcards = initFlashcards();
    }

  ionViewWillEnter() {
  }

  addEmoji(event) {
    this.flashcards.icon = `${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
 }

  @ViewChild('inputOfTag') inputOfTag;
  addTag() {
    if (this.tagInput) {
      this.flashcards.tags.push(this.tagInput);
      this.tagInput = '';
    }
    this.inputOfTag.setFocus();
  }
  removeTag(i: number) {
    this.flashcards.tags.splice(i,1);
  }

  save() {
    this.util.save_StorageData(this.flashcards);
    this.dismissModal(true);
  }

  dismissModal(saved?: boolean) {
    this.modalCtrl.dismiss(saved);
  }
}