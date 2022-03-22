import { TestBed } from '@angular/core/testing';

import { ToDoHomeService } from './to-do-home.service';

describe('ToDoHomeService', () => {
  let service: ToDoHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
