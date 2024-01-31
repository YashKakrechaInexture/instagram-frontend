import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth.guard';
import { SearchComponent } from './pages/search/search.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { CreateComponent } from './pages/create/create.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PostComponent } from './pages/post/post/post.component';
import { SignupComponent } from './pages/signup/signup/signup.component';
import { EnableUserComponent } from './pages/signup/enable-user/enable-user/enable-user.component';
import { FollowersComponent } from './pages/profile/followers/followers.component';
import { FollowingComponent } from './pages/profile/following/following.component';
import { NotFoundComponent } from './pages/error/not-found/not-found.component';
import { ChatComponent } from './pages/chat/chat/chat.component';

const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch:'full'},
  {path: 'signup', component: SignupComponent},
  {path: 'enable', component: EnableUserComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
  {path: 'explore', component: ExploreComponent, canActivate: [AuthGuard]},
  {path: 'notification', component: NotificationComponent, canActivate: [AuthGuard]},
  {path: 'create', component: CreateComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: NotFoundComponent, canActivate: [AuthGuard]},
  {path: 'profile/:username', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'profile/:username/followers', component: FollowersComponent, canActivate: [AuthGuard]},
  {path: 'profile/:username/following', component: FollowingComponent, canActivate: [AuthGuard]},
  {path: 'post/:id', component: PostComponent, canActivate: [AuthGuard]},
  {path: 'chat/:username', component: ChatComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
