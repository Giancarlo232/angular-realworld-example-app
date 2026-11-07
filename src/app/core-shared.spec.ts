import { JwtService } from './core/services/jwt.service';
import { MarkdownPipe } from './article/markdown.pipe';
import { ListErrorsComponent } from './shared/list-errors.component';

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(() => {
    window.localStorage.removeItem('jwtToken');
    service = new JwtService();
  });

  it('guarda y recupera el token', () => {
    service.saveToken('abc123');
    expect(service.getToken()).toBe('abc123');
  });

  it('elimina el token guardado', () => {
    service.saveToken('abc123');
    service.destroyToken();
    expect(service.getToken()).toBeUndefined();
  });
});

describe('MarkdownPipe', () => {
  it('convierte markdown a HTML', () => {
    const pipe = new MarkdownPipe();
    expect(pipe.transform('**negrita**')).toContain('<strong>negrita</strong>');
  });
});

describe('ListErrorsComponent', () => {
  it('formatea los errores como clave y mensaje', () => {
    const component = new ListErrorsComponent();
    component.errors = { errors: { email: 'ya existe' } };
    expect(component.errorList).toEqual(['email ya existe']);
  });

  it('devuelve lista vacia cuando no hay errores', () => {
    const component = new ListErrorsComponent();
    component.errors = {} as any;
    expect(component.errorList).toEqual([]);
  });
});
