import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'round-details/:_id',
    loadChildren: () => import('./history/history-details/history-details.module').then(m => m.HistoryDetailsModule)
  },
  {
    path: 'create-user',
    loadChildren: () => import('./create-user/create-user.module').then(m => m.CreateUserModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
