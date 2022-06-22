import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';
import { Subscription } from 'rxjs';
import { DashBoardState } from '../states/screen';
import { DashBoardData } from '../types/response';

@Injectable({
  providedIn: 'root',
})
export class DashBoardService implements OnDestroy {
  constructor(private apollo: Apollo) {
    this.querySubscription = this.apollo
      .watchQuery<DashBoardData, EmptyObject>({
        query: this.query,
        pollInterval: 3000,
      })
      .valueChanges.subscribe(({ data, loading, error }) => {
        if (error) {
          this.state.errorsOccured = true;
        } else {
          this.state.errorsOccured = false;
        }
        this.state.loading = loading;
        this.state.data = data;
      });
  }
  private querySubscription: Subscription | null = null;
  state: DashBoardState = new DashBoardState();
  query = gql`
    query GET_DASHBOARD_DATA {
      totalRedirects
      totalLinks
      topLinks {
        code
        longUrl
        dateCreated
        status
        redirects
      }
      totalPassiveLinks
      totalActiveLinks
    }
  `;
  ngOnDestroy(): void {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
