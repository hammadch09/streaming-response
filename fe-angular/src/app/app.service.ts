import { Socket } from 'ngx-socket-io';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from './dictionary/question';

@Injectable({
  providedIn: 'root'
})
export class AppService {

    questions: Question[] =
    [
        new Question(1, "What's the core idea of SICP in 150 words?"),
        new Question(2, "Why did Terry Davis go mad?"),
        new Question(3, "What did John Carmack achieve at ID Software?"),
        new Question(4, "What were the last words of Captain Ahab in Moby Dick?"),
        new Question(5, "Do you think K's inability to find The Castle is a mirroring of man's inability to find answers to the most important questions in his life?"),
    ]

    constructor(private socket: Socket) { }

    sendQuestionId(questionId: number): void {
        this.socket.emit('questionId', questionId);
    }

    getStreamingAnswer(): Observable<string> {
        return this.socket.fromEvent<string>('streamingAnswer');
    }
}
