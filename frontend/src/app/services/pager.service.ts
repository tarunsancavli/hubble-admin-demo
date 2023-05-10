import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagerService {

  pageNumberSelected: number = 0;

  constructor(private http: HttpClient) {  }
    getPager(totalItems: number, currentPage: number = 0, pageSize: number = 10) {
      let totalPages = Math.ceil(totalItems / pageSize);

      if (currentPage < 0) {
        currentPage = 0;
      } else if (currentPage > totalPages) {
        currentPage = totalPages;
      }

      let startPage: number, endPage: number;
      if (totalPages <= 10) {
        startPage = 0;
        endPage = totalPages;
      } else {
        if (currentPage <= 6) {
          startPage = 0;
          endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
          startPage = totalPages - 9;
          endPage = totalPages;
        } else { 
          startPage = currentPage - 5;
          endPage = currentPage + 4;
        }
      }

      let startIndex = (currentPage - 1) * pageSize;
      let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

      let pages = Array.from(Array((endPage) - startPage).keys()).map(i => startPage + i);

      return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
      };
      
    }
}
