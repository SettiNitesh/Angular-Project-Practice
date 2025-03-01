import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CarService } from '../../service/car.service';
import { IAppState } from '../app.state';
import { setLoading } from '../loader/loader.action';

import {
  addCar,
  addCarSuccess,
  deleteCar,
  deleteCarSuccess,
  loadCars,
  loadCarsSuccess,
  updateCar,
  updateCarSuccess,
} from './car.action';

export const loadCars$ = createEffect(
  (actions$ = inject(Actions), carsService = inject(CarService)) => {
    return actions$.pipe(
      ofType(loadCars),
      mergeMap(() =>
        carsService
          .getAllCarRentals()
          .pipe(map((data) => loadCarsSuccess(data)))
      ),
      catchError((err) => {
        console.log(err);
        return of();
      })
    );
  },
  { functional: true }
);

export const addCar$ = createEffect(
  (
    actions$ = inject(Actions),
    carsService = inject(CarService),
    store = inject(Store<IAppState>),
    snackBar = inject(MatSnackBar)
  ) => {
    return actions$.pipe(
      ofType(addCar),
      mergeMap((action) => {
        return carsService.addCar(action.car).pipe(
          map((data) => {
            store.dispatch(setLoading({ isLoading: false }));
            snackBar.open('New Car added successfully!', 'Close', {
              duration: 3000,
            });
            return addCarSuccess({ car: data });
          }),
          catchError((err) => {
            console.log(err);
            return of();
          })
        );
      })
    );
  },
  { functional: true }
);

export const updateCar$ = createEffect(
  (
    actions$ = inject(Actions),
    carsService = inject(CarService),
    store = inject(Store<IAppState>),
    snackBar = inject(MatSnackBar)
  ) => {
    return actions$.pipe(
      ofType(updateCar),
      mergeMap((action) => {
        return carsService.updateCar(action.car).pipe(
          map((data) => {
            store.dispatch(setLoading({ isLoading: false }));
            snackBar.open('Car Edited successfully!', 'Close', {
              duration: 3000,
            });
            return updateCarSuccess({ car: data });
          }),
          catchError((err) => {
            console.log(err);
            return of();
          })
        );
      })
    );
  },
  { functional: true }
);

export const deleteCar$ = createEffect(
  (
    actions$ = inject(Actions),
    carsService = inject(CarService),
    store = inject(Store<IAppState>),
    snackBar = inject(MatSnackBar)
  ) => {
    return actions$.pipe(
      ofType(deleteCar),
      mergeMap((action) => {
        return carsService.deleteCarByID(action.carId).pipe(
          map((data) => {
            store.dispatch(setLoading({ isLoading: false }));
            snackBar.open('Car Deleted successfully!', 'Close', {
              duration: 3000,
            });
            return deleteCarSuccess({ car: data });
          }),
          catchError((err) => {
            console.log(err);
            return of();
          })
        );
      })
    );
  },
  { functional: true }
);
