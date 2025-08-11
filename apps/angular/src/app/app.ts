import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { useFindManyPost } from '../../generatedAPI';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'angular';

}
