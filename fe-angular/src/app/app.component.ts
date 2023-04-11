import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Subscription } from 'rxjs';
import { Question } from './dictionary/question';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    subscription!: Subscription;
    answer: string[] = [];
    questions!: Question[];

    questionId!: number;

    constructor(private appService: AppService) {
        this.questions = this.appService.questions;
        this.subscription = new Subscription();
    }

    ngOnInit() {
        this.subscription = this.appService.getStreamingAnswer()
        .subscribe((res) => {
            this.answer.push(res);
        });
    }

    onSelectQuestion(ev: any) {
        this.answer = [];
        this.questionId = ev.target.value;
        this.appService.sendQuestionId(this.questionId);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

