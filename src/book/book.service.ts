import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookForm } from "./book.dto";
import { BookEntity } from "./book.entity";


@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private bookRepo: Repository<BookEntity>,
    ) { }


    addBook(mydto: BookForm): any {

        return this.bookRepo.save(mydto);
    }
    getIndex(): any {
        return this.bookRepo.find();
    }
    async getBookByID(id) {

        const data = await this.bookRepo.findOneBy({ id });
        console.log(data);
        if (data !== null) {
            return data;
        }
        else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }



}