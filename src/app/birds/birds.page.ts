import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-birds',
  templateUrl: './birds.page.html',
  styleUrls: ['./birds.page.scss'],
})
export class BirdsPage implements OnInit {

  pajaros: any[] = [];
  audio: HTMLAudioElement | null = null;
 
  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get<any>("https://xeno-canto.org/api/2/recordings?query=cnt:guatemala")
      .subscribe({
        next: (res) => {
          console.log('Datos recibidos:', res);
          this.pajaros = res.recordings;
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
  }

  reproducirSonido(url: string): void {
    if (!this.audio || this.audio.src !== url) {
      this.audio = new Audio(url);
      this.audio.play().catch((error: unknown) => console.error('Error al reproducir el sonido:', error));
    } else if (this.audio.paused) {
      this.audio.play().catch((error: unknown) => console.error('Error al reproducir el sonido:', error));
    }
  }

  pausarSonido(): void {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }
  }
  
  ngOnDestroy(): void {
    // Pausar el audio si está en reproducción cuando el componente se destruye
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }
  }

}