import {Component, OnInit} from '@angular/core';
import {
  concatMap,
  delay,
  exhaustMap,
  filter,
  interval,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  take,
  tap
} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'snapExample';
  //interval2$!: Observable<string>;
  //interval$ = interval(1000);
  intervalInt1$!: Observable<string>;
  intervalInt2$!: Observable<string>;
  intervalExt$ = interval(1000);
  redTrainsCalled = 0;
  yellowTrainsCalled = 0;
  ngOnInit() {
   /* const interval$ = interval(1000);
    interval$.subscribe(value => console.log(value));
    setTimeout(() => {interval$.subscribe(value => console.log(value))}, 3000);
    this.interval2$ = interval(1000).pipe(
      filter(value => value % 3 === 0),
      map(value => value % 2 === 0 ?
        `je suis ${value} pair`:
        `je suis ${value} impair`),
      tap(text => this.logger(text))
    );

    this.intervalExt$.pipe(
      concatMap(value => this.getOb(value))
    ).subscribe()*/

    interval(500).pipe(
      take(10),
      map(value => value % 2 === 0 ? 'rouge' : 'jaune'),
      tap(color => console.log(`La lumière s'allume en %c${color}`, `color: ${this.translateColor(color)}`)),
      switchMap(color => this.getTrainsObservable$(color)),
      tap(train => console.log(`Train %c${train.color} ${train.trainIndex} arrivé !`,
        `font-weight: bold; color: ${this.translateColor(train.color)}`))
    ).subscribe()
  }

  getTrainsObservable$(color: 'rouge' | 'jaune') {
    const isRedTrain= color === 'rouge';
    isRedTrain ? this.redTrainsCalled++ : this.yellowTrainsCalled++;
    const trainIndex = isRedTrain ? this.redTrainsCalled : this.yellowTrainsCalled;
    console.log(`Train %c${color} ${trainIndex} appelé !`, `text-decoration: underline; color: ${this.translateColor(color)}`)
    return of({color , trainIndex}).pipe(
      delay(isRedTrain ? 5000 : 6000)
    );
  }

  translateColor(color: 'rouge' | 'jaune') {
    return color === 'rouge' ? 'red' : 'yellow';
  }

  logger(text: string): void {
    console.log(`Log: ${text}`);
  }

  getOb(test:number) {
    console.log("number of obEx"+ test)
    if(test % 2 === 0) {
      return this.intervalInt1$.pipe(
        map(value => test % 2 === 0 ?
          `je suis ob1 ${test} pair`:
          `je suis ob1 ${test} impair`),
        tap(test => this.logger(test))
      );
    }else {
      return this.intervalInt2$= interval(2000).pipe(
        map(value => value % 2 === 0 ?
          `je suis ob2 ${value} pair`:
          `je suis ob2 ${value} impair`),
        tap(value => this.logger(value))
      );
    }

  }
}
