import { Component, Inject, Pipe } from '@angular/core';
import { Http } from '@angular/http';
import { JsonPipe } from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {


    baseUrl: string;
    isCopied: boolean = false;
    isValidRequest: boolean = true;
    json: {};
    asset: {};
    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {

        this.baseUrl = baseUrl;
    }

    process(input: any) {

        if (!input || input.value == '') return false;

        this.isValidRequest = true;
        let tweetId;

        input = input.trim();

        if (isNaN(input)) {
            tweetId = input.substring(input.lastIndexOf('/') + 1);
        }
        else {
            tweetId = input;
        }

        this.http.get(this.baseUrl + 'api/Tweet/' + tweetId).subscribe(r => {

            var o = r.json();

            if (!o.data) {
                this.json = "invalid data";
                this.asset = "{data: Invalid}";
                this.isValidRequest = false;
                return;
            }
            this.asset = JSON.parse(o.data);
            this.json = o.data as string;
            console.log(this.isValidRequest);

        }, error => { this.isValidRequest = false; this.json = "invalid data"; this.asset = "{data: Invalid}";console.error(error) });

        return false;
    }


}

