import { TestBed } from '@angular/core/testing';

import { CartInfoService } from './cart-info.service';

describe('CartInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartInfoService = TestBed.get(CartInfoService);
    expect(service).toBeTruthy();
  });
});
