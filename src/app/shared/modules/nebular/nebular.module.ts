import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbIconModule,
   NbActionsModule, NbMenuModule, NbCardModule, NbButtonModule,
   NbTabsetModule, NbInputModule, NbBadgeModule, NbUserModule, NbToastrModule, NbSelectModule  } from '@nebular/theme';
import { FlipCardComponent } from './flip-card/flip-card.component';
import { CardComponent } from './card/card.component';
@NgModule({
  declarations: [FlipCardComponent, CardComponent],
  imports: [
    CommonModule,
    NbThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbToastrModule.forRoot(),
    NbSelectModule,
    NbCardModule,
    NbLayoutModule,
    NbIconModule,
    NbActionsModule,
    NbCardModule,
    NbButtonModule,
    NbTabsetModule,
    NbInputModule,
    NbBadgeModule,
    NbUserModule,
  ],
  exports: [
    NbThemeModule,
    NbLayoutModule,
    NbSidebarModule,
    NbIconModule,
    NbActionsModule,
    NbMenuModule,
    NbCardModule,
    NbButtonModule,
    CardComponent,
    FlipCardComponent,
    NbTabsetModule,
    NbInputModule,
    NbBadgeModule,
    NbUserModule,
    NbToastrModule,
    NbSelectModule
  ]
})
export class NebularModule { }
