import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flower } from '../common/flower';
import { Observable, map } from 'rxjs';
import { FlowerCategory } from '../common/flower-category';

@Injectable({
  providedIn: 'root',
})
export class FlowerService {
  flowersUrl = 'http://localhost:8080/api/flowers';
  categoryUrl = 'http://localhost:8080/api/flower-category';

  constructor(private httpClient: HttpClient) {}

  // getFlowerList(): Observable<Flower[]> {
  //   return this.httpClient
  //     .get<GetResponseFlowers>(this.flowersUrl)
  //     .pipe(map((response) => response._embedded.flowers));
  // }

  getFlowerList(theCategoryId: number): Observable<Flower[]> {
    const searchUrl =
      'http://localhost:8080/api/flowers/search/findByCategoryId?id=' +
      theCategoryId;

    return this.httpClient
      .get<GetResponseFlowers>(searchUrl)
      .pipe(map((response) => response._embedded.flowers));
  }

  getFlowerCategories(): Observable<FlowerCategory[]> {
    return this.httpClient
      .get<GetResponseCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.flowerCategory));
  }

  searchFlowers(theKeyword: string | null): Observable<Flower[]> {
    const searchUrl =
      'http://localhost:8080/api/flowers/search/findByNameContaining?name=' +
      theKeyword;

    return this.httpClient
      .get<GetResponseFlowers>(searchUrl)
      .pipe(map((response) => response._embedded.flowers));
  }

  getFlower(theFlowerId: string | null): Observable<Flower> {
    const flowerUrl = 'http://localhost:8080/api/flowers/' + theFlowerId;
    return this.httpClient.get<Flower>(flowerUrl);
  }

  getFlowerListPaginate(
    thePage: number,
    thePageSize: number,
    theCategoryId: number
  ): Observable<GetResponseFlowers> {
    //http://localhost:8080/api/products/search/findByCategoryId?id=1&page=1&size=2
    //const url = 'http://localhost:8080/api/products/search/findByCategoryId?id='+theCategoryId+'&page='+thePage+'&size='+thePageSize

    const url = `http://localhost:8080/api/flowers/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseFlowers>(url);
  }

  searchFlowersPaginate(
    thePage: number,
    thePageSize: number,
    theKeyword: any
  ): Observable<GetResponseFlowers> {
    const searchUrl = `http://localhost:8080/api/flowers/search/findByNameContaining?name=${theKeyword}&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseFlowers>(searchUrl);
  }
}

// interface GetResponseFlowers {
//   _embedded: {
//     flowers: Flower[];
//   };
// }

export interface GetResponseFlowers {
  _embedded: {
    flowers: Flower[];
  };
  page: {
    size: 2;
    totalElements: 20;
    totalPages: 10;
    number: 0;
  };
}

interface GetResponseCategory {
  _embedded: {
    flowerCategory: FlowerCategory[];
  };
}
