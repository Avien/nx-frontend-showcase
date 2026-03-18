import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterModule],
  template: `
    <div class="container">
      <h1>Nx Frontend Showcase</h1>
      <p class="about">
        This project demonstrates scalable frontend architecture using Nx, with
        feature-driven design, lazy-loaded routing, and facade-based
        orchestration.
      </p>

      <p>Select a feature to explore:</p>

      <div class="grid">
        <a routerLink="/wizard" class="card">
          <h2>🔌 Connector Wizard</h2>
          <p>Multi-step flow with guards and lazy loading</p>
        </a>

        <a routerLink="/users" class="card">
          <h2>👥 Users Directory</h2>
          <p>Server-driven searchable list with pagination</p>
        </a>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 48px 24px;
        max-width: 900px;
        margin: 0 auto;
        animation: fadeIn 0.3s ease;
      }

      h1 {
        margin-bottom: 8px;
      }

      .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-top: 24px;
      }

      .card {
        display: block;
        padding: 20px;
        border-radius: 12px;
        border: 1px solid #ddd;
        text-decoration: none;
        color: inherit;
        transition: all 0.2s ease;
      }

      .card:hover {
        border-color: #333;
        transform: translateY(-2px);
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .about {
        margin-top: 8px;
        max-width: 600px;
        color: #555;
        line-height: 1.5;
      }
    `,
  ],
})
export class HomeComponent {}
