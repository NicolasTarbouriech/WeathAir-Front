import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FavoriteComponent } from "./components/favorite.component";
import { SharedModule } from '../../../shared/shared.module';
import { FavoriteRoutingModule } from "./favorite-routing.module";

@NgModule({
    declarations: [FavoriteComponent],
    imports: [
        CommonModule,
        FavoriteRoutingModule, 
        SharedModule, 
    ]
  })
  export class FavoriteModule { }