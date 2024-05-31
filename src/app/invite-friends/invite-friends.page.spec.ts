import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InviteFriendsPage } from './invite-friends.page';

describe('InviteFriendsPage', () => {
  let component: InviteFriendsPage;
  let fixture: ComponentFixture<InviteFriendsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteFriendsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
