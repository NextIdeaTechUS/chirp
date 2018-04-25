import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './components/app/app.component';
//import { HomeComponent } from './components/home/home.component';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        NgxJsonViewerModule,
        CommonModule,
        HttpModule,
        FormsModule,
        ClipboardModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
           // { path: 'home', component: HomeComponent },
          
            // { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
