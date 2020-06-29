import { FormGroup, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book.model';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  lastestBook: Book[] = [];
  books: Book[] = [];
  searchForm: FormGroup;
  isSearch = false;

  // For Pagination
  public currentPage: number;
  public startPage = 0;
  public endPage: number;

  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      title: [''],
      author: ['']
    });
    this.getBookEnabled();
    this.getLastestBook();
  }

  // convinience getter for easy access to form fields
  get f() { return this.searchForm.controls; }

  public getBookEnabled() {
    this.bookService.getBookEnable()
          .pipe(first())
          .subscribe(
            data => {
              console.log(data);
              this.books = data.booksDto;
              this.currentPage = data.currentPage;
              this.endPage = data.totalPages - 1;
            }
          );
  }

  public getLastestBook() {
    this.bookService.getBookNew().subscribe(
      data => {
        console.log(data);
        this.lastestBook = data.booksDto;
      }
    )
  }

  public search() {
    this.bookService.searchBookByTitleOrAuthor(this.f.title.value, this.f.author.value).subscribe(
      response => {
          this.books = response;
          this.lastestBook = [];
      }
    )
  }

  public getNextPage() {
    this.bookService.getBookEnable(this.currentPage + 1).subscribe(
      response => {
        this.books = response.booksDto;
        this.currentPage = response.currentPage;
      }
    );
}

public getPrePage() {
  this.bookService.getBookEnable(this.currentPage - 1).subscribe(
    response => {
      this.books = response.booksDto;
      this.currentPage = response.currentPage;
    }
  );
}

public getStartPage() {
  this.bookService.getBookEnable(this.startPage).subscribe(
    response => {
      this.books = response.booksDto;
      this.currentPage = response.currentPage;
    }
  );
}

public getEndPage() {
  this.bookService.getBookEnable(this.endPage).subscribe(
    response => {
      this.books = response.booksDto;
      this.currentPage = response.currentPage;
    }
  );
}
}