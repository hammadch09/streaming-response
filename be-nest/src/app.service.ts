import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

interface Appendix {
  id: number;
  question: string;
  answer: string;
}

@Injectable()
export class AppService {
  filePath = path.join(__dirname, '../src/appendix.json');

  getHello(): string {
    return 'Hello World!';
  }

  getAnswerById(id: number) {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      const jsonData: Appendix[] = JSON.parse(data);
      return jsonData.find((a) => +a.id === +id);
    } catch (error) {
      console.error('Error reading JSON file:', error);
    }
  }
}
