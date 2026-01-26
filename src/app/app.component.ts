import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, delay } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  loading = true;
  alerts: [];

  private destroy$ = new Subject<void>();

  private apiUrl = 'https://api.weather.gov/alerts/active?area=WV'; 
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getActiveAlerts().subscribe(data => {
      this.alerts = data;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  getActiveAlerts(): Observable<any> { 
    return this.http.get<any>(this.apiUrl).pipe(
      delay(2000),
      map(response => {
        return response.features.map(f => ({ 
          id: f.properties.id,
          event: f.properties.event,
          headline: f.properties.headline, 
          description: f.properties.description,
          severity: f.properties.severity,
          certainty: f.properties.certainty,
          urgency: f.properties.urgency,
          areas: f.properties.areaDesc.split(';').map(a => a.trim()), sent: f.properties.sent, expires: f.properties.expires })); 
        }));
      };
}
