import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // (Semana 3) 1) Construcción del formulario reactivo
    this.form = this.fb.group({
      email: ['da@localhost', [Validators.required]],
      password: ['p4ssw0rD!', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.authService.authenticate(
      this.form.value.email,
      this.form.value.password
    ).subscribe({
      next: (session) => {
        this.sessionService.setSession(session);
        this.router.navigate(['/']); // redirigir a la página principal
      },
      error: (err: any) => {
        console.error('Error de autenticación:', err);
        alert('Credenciales inválidas. Intente nuevamente.');
      }
    });
  }

}
