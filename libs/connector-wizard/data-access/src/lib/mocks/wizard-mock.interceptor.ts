import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import { MOCK_CONNECTORS } from './connectors.mock';
import {delay, of, throwError} from "rxjs";

@Injectable()
export class WizardMockInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (!req.url.startsWith('/api/wizard')) {
            return next.handle(req);
        }

        if (req.url.endsWith('/services')) {
            return of(new HttpResponse({
                status: 200,
                body: MOCK_CONNECTORS,
            })).pipe(delay(500));
        }

        if (req.url.endsWith('/service')) {
            return of(new HttpResponse({
                status: 200,
                body: { success: true },
            })).pipe(delay(400));
        }

        if (req.url.endsWith('/auth')) {
            return of(new HttpResponse({
                status: 200,
                body: { authorized: true },
            })).pipe(delay(800));
        }

        if (req.url.endsWith('/finish')) {
            const fail = Math.random() < 0.5;

            if (fail) {
                return throwError(() =>
                    new HttpErrorResponse({
                        status: 503,
                        error: {message: 'Service temporarily unavailable'},
                    })
                ).pipe(delay(400));
            }

            return of(new HttpResponse({
                status: 200,
                body: {ok: true},
            })).pipe(delay(400));
        }

        return next.handle(req);
    }
}
