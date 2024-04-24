(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-pages-module"],{

/***/ "+j1i":
/*!****************************************************!*\
  !*** ./src/app/pages/welcome/welcome.component.ts ***!
  \****************************************************/
/*! exports provided: WelcomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomeComponent", function() { return WelcomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");


class WelcomeComponent {
}
WelcomeComponent.ɵfac = function WelcomeComponent_Factory(t) { return new (t || WelcomeComponent)(); };
WelcomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: WelcomeComponent, selectors: [["app-welcome"]], decls: 4, vars: 3, consts: [[1, "container"], [1, "title"]], template: function WelcomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 1, "welcome"));
    } }, pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__["TranslatePipe"]], styles: [".container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFx3ZWxjb21lLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0FBQ0YiLCJmaWxlIjoid2VsY29tZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuIl19 */"] });


/***/ }),

/***/ "5smk":
/*!************************************************************************************************!*\
  !*** ./src/app/pages/domain-manager/components/discount-manager/discount-manager.component.ts ***!
  \************************************************************************************************/
/*! exports provided: TableId, DiscountManagerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableId", function() { return TableId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiscountManagerComponent", function() { return DiscountManagerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_components_discount_manager_dialog_discount_manager_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/components/discount-manager-dialog/discount-manager-dialog.component */ "sIYK");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var table_generator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! table-generator */ "pdjk");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _services_loyalty_programs_loyalty_programs_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @services/loyalty-programs/loyalty-programs.service */ "wcYz");
/* harmony import */ var _services_products_products_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @services/products/products.service */ "f+7+");
/* harmony import */ var _services_organizations_organizations_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @services/organizations/organizations.service */ "zSN6");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _projects_table_generator_src_lib_table_generator_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../../projects/table-generator/src/lib/table-generator.component */ "opF+");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");















var TableId;
(function (TableId) {
    TableId["MAIN"] = "main";
    TableId["ITEMS"] = "items";
})(TableId || (TableId = {}));
class DiscountManagerComponent {
    constructor(dialog, loyaltyProgramsService, productService, organizationService) {
        this.dialog = dialog;
        this.loyaltyProgramsService = loyaltyProgramsService;
        this.productService = productService;
        this.organizationService = organizationService;
        this.dialogOrganizations = [];
        this.discounts = [];
        this.data = [];
        this.dialogProducts = [];
        this.clickedRow = null;
        this.TableId = TableId;
        this.onDataChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.columnsConfiguration = {
            accumulated: {
                translateKey: 'accumulated',
                type: 'checkbox',
            },
            organization: {
                translateKey: 'organization',
                type: 'object',
                displayWith: (organization) => organization === null || organization === void 0 ? void 0 : organization.name,
            },
            product: {
                translateKey: 'product',
                type: 'string',
            },
            discountType: {
                translateKey: 'discountType',
                type: 'string',
            },
            discount: {
                translateKey: 'discount',
                type: 'string',
            },
            startDate: {
                translateKey: 'startDate',
                type: 'string',
            },
            endDate: {
                translateKey: 'endDate',
                type: 'string',
            },
            offPeakStart: {
                translateKey: 'offPeakStart',
                type: 'string',
            },
            offPeakEnd: {
                translateKey: 'offPeakEnd',
                type: 'string',
            },
            isOssOrigin: {
                translateKey: 'isOssOrigin',
                type: 'boolean',
            },
            isWithAssociatedProduct: {
                translateKey: 'isWithAssociatedProduct',
                type: 'string',
            },
        };
        this.itemsTableColumns = [
            'accumulated',
            'organization',
            'product',
            'discountType',
            'discount',
            'startDate',
            'endDate',
            'offPeakStart',
            'offPeakEnd',
            'isOssOrigin',
            'isWithAssociatedProduct',
            table_generator__WEBPACK_IMPORTED_MODULE_5__["NoDataColumnName"].columnsSelector,
        ];
        this._onDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.itemsTableOptions = {
            showResult: false,
        };
    }
    ngOnInit() {
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["forkJoin"])({
            organizations: this.organizationService.getFilteredOrganizations(''),
            products: this.productService.getAllProducts(),
            loyaltyPrograms: this.loyaltyProgramsService.getAllLoyaltyPrograms(),
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this._onDestroy$))
            .subscribe((results) => {
            this.data = results.loyaltyPrograms;
            this.data.forEach((date) => {
                date.startDate = new Date(date.startDate).toLocaleDateString('en-GB');
                date.endDate = new Date(date.endDate).toLocaleDateString('en-GB');
            });
            this.dialogOrganizations = results.organizations;
            this.dialogProducts = results.products;
            this.offPeakStart = [
                { name: '00:00' },
                { name: '01:00' },
                { name: '02:00' },
            ];
            this.offPeakEnd = [
                { name: '00:00' },
                { name: '01:00' },
                { name: '02:00' },
            ];
        });
    }
    ngOnDestroy() {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }
    onRowClicked({ row }) {
        this.clickedRow = null;
        if (row) {
            this.clickedRow = row;
        }
    }
    onRowDoubleClicked({ row }) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.editedIndex = this.data.findIndex((domainParam) => domainParam.id === row.id);
            const edited = yield this.openItemDialog(row);
            edited.startDate = new Date(edited.startDate).toLocaleDateString('en-GB');
            edited.endDate = new Date(edited.endDate).toLocaleDateString('en-GB');
            edited.offPeakStart = new Date(edited.offPeakStart).toLocaleDateString('en-GB');
            edited.offPeakEnd = new Date(edited.offPeakEnd).toLocaleDateString('en-GB');
            if (edited) {
                this.data[this.editedIndex] = edited;
                this.data = [...this.data];
            }
        });
    }
    openItemDialog(discountManager) {
        const itemFormDialog = this.dialog.open(_shared_components_discount_manager_dialog_discount_manager_dialog_component__WEBPACK_IMPORTED_MODULE_2__["DiscountManagerDialogComponent"], {
            width: 'fit-content',
            disableClose: true,
            data: {
                data: this.data,
                row: discountManager,
                editedIndex: this.editedIndex,
                organizations: this.dialogOrganizations,
                products: this.dialogProducts,
                discountType: [DiscountType.fixed, DiscountType.percentage],
                offPeakStart: this.offPeakStart,
                offPeakEnd: this.offPeakEnd,
            },
        });
        return itemFormDialog
            .afterClosed()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(() => Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this._onDestroy$)))
            .toPromise();
    }
}
DiscountManagerComponent.ɵfac = function DiscountManagerComponent_Factory(t) { return new (t || DiscountManagerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_loyalty_programs_loyalty_programs_service__WEBPACK_IMPORTED_MODULE_7__["LoyaltyProgramsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_products_products_service__WEBPACK_IMPORTED_MODULE_8__["ProductsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_organizations_organizations_service__WEBPACK_IMPORTED_MODULE_9__["OrganizationsService"])); };
DiscountManagerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: DiscountManagerComponent, selectors: [["app-discount-manager"]], decls: 20, vars: 8, consts: [[1, "domain-manager"], [1, "header"], [1, "title"], [1, "actions"], ["mat-mini-fab", "", "id", "button-save", "type", "submit", "color", "primary"], ["mat-mini-fab", "", "id", "button-reload-tab", "type", "button", "color", "primary"], ["mat-mini-fab", "", "id", "button-close-tab", "type", "button", "color", "primary"], [1, "body"], [1, "body-container"], [3, "columnsConfiguration", "allColumns", "tableOptions", "data", "rowDblClick"]], template: function DiscountManagerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "save");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "sync");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "close");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "talan-table-generator", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("rowDblClick", function DiscountManagerComponent_Template_talan_table_generator_rowDblClick_18_listener($event) { return ctx.onRowDoubleClicked($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, " > ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 6, "discountManager"), " (", ctx.data.length, ")");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("columnsConfiguration", ctx.columnsConfiguration)("allColumns", ctx.itemsTableColumns)("tableOptions", ctx.itemsTableOptions)("data", ctx.data);
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButton"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__["MatIcon"], _projects_table_generator_src_lib_table_generator_component__WEBPACK_IMPORTED_MODULE_12__["TableGeneratorComponent"]], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__["TranslatePipe"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\ntalan-table-generator[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n\n.domain-manager[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%] {\n  padding: 0 1rem;\n  background-color: white;\n  color: black;\n  margin-bottom: 0.5rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.domain-manager[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  margin: revert;\n}\n\n.domain-manager[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n\n.domain-manager[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin: 0 0.25rem;\n}\n\n.domain-manager[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%] {\n  margin: 0.5rem;\n  margin-right: 0;\n  display: flex;\n  min-height: 75vh;\n}\n\n.domain-manager[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   .body-selectors[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.domain-manager[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   .body-selectors[_ngcontent-%COMP%]   .selector[_ngcontent-%COMP%] {\n  padding: 0.5rem;\n  background-color: #ffffff40;\n  border: 1px solid #ffffff40;\n  width: -moz-fit-content;\n  width: fit-content;\n  cursor: pointer;\n}\n\n.domain-manager[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   .body-selectors[_ngcontent-%COMP%]   .selector.active[_ngcontent-%COMP%] {\n  background-color: white;\n  color: black;\n}\n\n.domain-manager[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   .body-selectors[_ngcontent-%COMP%]   .selector.disabled[_ngcontent-%COMP%] {\n  opacity: 0.8;\n  background-color: #bdbdbdad;\n  color: #4141417d;\n  cursor: not-allowed;\n}\n\n.domain-manager[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   .body-selectors[_ngcontent-%COMP%]   .selector[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  font-size: 40px;\n}\n\n.domain-manager[_ngcontent-%COMP%]   .body[_ngcontent-%COMP%]   .body-container[_ngcontent-%COMP%] {\n  width: 100%;\n  background-color: white;\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXGRpc2NvdW50LW1hbmFnZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0FBQ0Y7O0FBR0U7RUFDRSxlQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EscUJBQUE7RUFDQSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtBQUFKOztBQUVJO0VBQ0UsY0FBQTtBQUFOOztBQUdJO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0FBRE47O0FBR007RUFDRSxpQkFBQTtBQURSOztBQU1FO0VBQ0UsY0FBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7QUFKSjs7QUFNSTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtBQUpOOztBQUtNO0VBQ0UsZUFBQTtFQUNBLDJCQUFBO0VBQ0EsMkJBQUE7RUFDQSx1QkFBQTtFQUFBLGtCQUFBO0VBQ0EsZUFBQTtBQUhSOztBQUtRO0VBQ0UsdUJBQUE7RUFDQSxZQUFBO0FBSFY7O0FBTVE7RUFDRSxZQUFBO0VBQ0EsMkJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FBSlY7O0FBT1E7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7QUFMVjs7QUFVSTtFQUNFLFdBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7QUFSTiIsImZpbGUiOiJkaXNjb3VudC1tYW5hZ2VyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxudGFsYW4tdGFibGUtZ2VuZXJhdG9yIHtcbiAgbWFyZ2luLXRvcDogMDtcbn1cblxuLmRvbWFpbi1tYW5hZ2VyIHtcbiAgLmhlYWRlciB7XG4gICAgcGFkZGluZzogMCAxcmVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIGNvbG9yOiBibGFjaztcbiAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcblxuICAgIC50aXRsZSB7XG4gICAgICBtYXJnaW46IHJldmVydDtcbiAgICB9XG5cbiAgICAuYWN0aW9ucyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cbiAgICAgIGJ1dHRvbiB7XG4gICAgICAgIG1hcmdpbjogMCAwLjI1cmVtO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC5ib2R5IHtcbiAgICBtYXJnaW46IDAuNXJlbTtcbiAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBtaW4taGVpZ2h0OiA3NXZoO1xuXG4gICAgLmJvZHktc2VsZWN0b3JzIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgLnNlbGVjdG9yIHtcbiAgICAgICAgcGFkZGluZzogMC41cmVtO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmNDA7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNmZmZmZmY0MDtcbiAgICAgICAgd2lkdGg6IGZpdC1jb250ZW50O1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgICAgICAgJi5hY3RpdmUge1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgICAgICAgIGNvbG9yOiBibGFjaztcbiAgICAgICAgfVxuXG4gICAgICAgICYuZGlzYWJsZWQge1xuICAgICAgICAgIG9wYWNpdHk6IDAuODtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYmRiZGJkYWQ7XG4gICAgICAgICAgY29sb3I6ICM0MTQxNDE3ZDtcbiAgICAgICAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICAgICAgICB9XG5cbiAgICAgICAgLm1hdC1pY29uIHtcbiAgICAgICAgICB3aWR0aDogNDBweDtcbiAgICAgICAgICBoZWlnaHQ6IDQwcHg7XG4gICAgICAgICAgZm9udC1zaXplOiA0MHB4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmJvZHktY29udGFpbmVyIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICBjb2xvcjogYmxhY2s7XG4gICAgfVxuICB9XG59XG4iXX0= */"] });
var DiscountType;
(function (DiscountType) {
    DiscountType["percentage"] = "PERCENTAGE";
    DiscountType["fixed"] = "FIXED";
})(DiscountType || (DiscountType = {}));


/***/ }),

/***/ "8D7W":
/*!******************************************!*\
  !*** ./src/app/pages/pages.component.ts ***!
  \******************************************/
/*! exports provided: PagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagesComponent", function() { return PagesComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_navigation_history_navigation_history_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @services/navigation-history/navigation-history.service */ "qY9r");
/* harmony import */ var _services_tabs_tabs_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @services/tabs/tabs.service */ "7KmC");
/* harmony import */ var _shared_components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/components/toolbar/toolbar.component */ "S9hJ");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _shared_components_tree_tree_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/components/tree/tree.component */ "NL+w");
/* harmony import */ var _shared_components_tabbed_container_tabbed_container_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/components/tabbed-container/tabbed-container.component */ "zYIw");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _welcome_welcome_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./welcome/welcome.component */ "+j1i");











function PagesComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-tree", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("treeData", ctx_r0.treeData)("isPanelMode", true)("showControls", true);
} }
function PagesComponent_app_tabbed_container_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "app-tabbed-container");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "router-outlet");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function PagesComponent_app_welcome_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-welcome");
} }
class PagesComponent {
    constructor(navigationHistoryService, tabsService) {
        this.navigationHistoryService = navigationHistoryService;
        this.tabsService = tabsService;
        this._onDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.showTree = false;
        this.treeData = [];
        this.toggleTree = () => {
            this.showTree = !this.showTree;
        };
        this.treeData = this.navigationHistoryService.getNavigationHistoryTree();
        this.navigationHistoryService.historyChanged$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(() => {
            this.showTree = false;
            this.treeData =
                this.navigationHistoryService.getNavigationHistoryTree();
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(this._onDestroy$))
            .subscribe();
    }
    get tabs() {
        return this.tabsService.openedTabs;
    }
    get currentTab() {
        return this.tabsService.getActiveTabData();
    }
    ngOnDestroy() {
        this._onDestroy$.next();
    }
}
PagesComponent.ɵfac = function PagesComponent_Factory(t) { return new (t || PagesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_navigation_history_navigation_history_service__WEBPACK_IMPORTED_MODULE_3__["NavigationHistoryService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_tabs_tabs_service__WEBPACK_IMPORTED_MODULE_4__["TabsService"])); };
PagesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: PagesComponent, selectors: [["app-pages"]], decls: 6, vars: 3, consts: [[3, "onGearClick"], [1, "container"], ["class", "side-section", 4, "ngIf"], [1, "main-section"], [4, "ngIf"], [1, "side-section"], [3, "treeData", "isPanelMode", "showControls"]], template: function PagesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "app-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("onGearClick", function PagesComponent_Template_app_toolbar_onGearClick_0_listener() { return ctx.toggleTree(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, PagesComponent_div_2_Template, 2, 3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, PagesComponent_app_tabbed_container_4_Template, 2, 0, "app-tabbed-container", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, PagesComponent_app_welcome_5_Template, 1, 0, "app-welcome", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.showTree);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.tabs.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.tabs.length === 0);
    } }, directives: [_shared_components_toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_5__["ToolbarComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _shared_components_tree_tree_component__WEBPACK_IMPORTED_MODULE_7__["TreeComponent"], _shared_components_tabbed_container_tabbed_container_component__WEBPACK_IMPORTED_MODULE_8__["TabbedContainerComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterOutlet"], _welcome_welcome_component__WEBPACK_IMPORTED_MODULE_10__["WelcomeComponent"]], styles: [".container[_ngcontent-%COMP%] {\n  display: flex;\n  height: calc(100% - 64px);\n}\n.container[_ngcontent-%COMP%]   .side-section[_ngcontent-%COMP%] {\n  width: 15vw;\n  min-width: 300px;\n}\n.container[_ngcontent-%COMP%]   .main-section[_ngcontent-%COMP%] {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXHBhZ2VzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLHlCQUFBO0FBQ0Y7QUFDRTtFQUNFLFdBQUE7RUFDQSxnQkFBQTtBQUNKO0FBRUU7RUFDRSxXQUFBO0FBQUoiLCJmaWxlIjoicGFnZXMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiBjYWxjKDEwMCUgLSA2NHB4KTtcblxuICAuc2lkZS1zZWN0aW9uIHtcbiAgICB3aWR0aDogMTV2dztcbiAgICBtaW4td2lkdGg6IDMwMHB4O1xuICB9XG5cbiAgLm1haW4tc2VjdGlvbiB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbn1cbiJdfQ== */"] });


/***/ }),

/***/ "OYyA":
/*!***********************************************!*\
  !*** ./src/app/core/guards/open-tab.guard.ts ***!
  \***********************************************/
/*! exports provided: OpenTabGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpenTabGuard", function() { return OpenTabGuard; });
/* harmony import */ var _constants_app_routes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @constants/app-routes */ "cr9A");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_tabs_tabs_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @services/tabs/tabs.service */ "7KmC");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");




class OpenTabGuard {
    constructor(tabsService, router) {
        this.tabsService = tabsService;
        this.router = router;
    }
    canActivateChild() {
        if (this.tabsService.openedTabs.length !== 0) {
            return true;
        }
        this.router.navigate([_constants_app_routes__WEBPACK_IMPORTED_MODULE_0__["appRoutes"].HOME]);
        return false;
    }
}
OpenTabGuard.ɵfac = function OpenTabGuard_Factory(t) { return new (t || OpenTabGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_tabs_tabs_service__WEBPACK_IMPORTED_MODULE_2__["TabsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
OpenTabGuard.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: OpenTabGuard, factory: OpenTabGuard.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "dgmN":
/*!***************************************!*\
  !*** ./src/app/pages/pages.module.ts ***!
  \***************************************/
/*! exports provided: PagesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagesModule", function() { return PagesModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/shared.module */ "PCNd");
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../material.module */ "vvyD");
/* harmony import */ var _create_edit_incident_components_add_organization_dialog_add_organization_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./create-edit-incident/components/add-organization-dialog/add-organization-dialog.component */ "PN1H");
/* harmony import */ var _create_edit_incident_components_add_resource_dialog_add_resource_dialog_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./create-edit-incident/components/add-resource-dialog/add-resource-dialog.component */ "a/Ou");
/* harmony import */ var _create_edit_incident_components_add_transmission_dialog_add_transmission_dialog_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./create-edit-incident/components/add-transmission-dialog/add-transmission-dialog.component */ "zgJI");
/* harmony import */ var _create_edit_incident_components_incident_attachments_incident_attachments_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./create-edit-incident/components/incident-attachments/incident-attachments.component */ "i31+");
/* harmony import */ var _create_edit_incident_components_incident_summary_incident_summary_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./create-edit-incident/components/incident-summary/incident-summary.component */ "P4pc");
/* harmony import */ var _create_edit_incident_components_incident_update_history_incident_update_history_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./create-edit-incident/components/incident-update-history/incident-update-history.component */ "P7AW");
/* harmony import */ var _create_edit_incident_create_edit_incident_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./create-edit-incident/create-edit-incident.component */ "6XgC");
/* harmony import */ var _domain_manager_components_domain_mappings_domain_mappings_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./domain-manager/components/domain-mappings/domain-mappings.component */ "mulG");
/* harmony import */ var _domain_manager_components_domain_parameter_dialog_domain_parameter_dialog_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./domain-manager/components/domain-parameter-dialog/domain-parameter-dialog.component */ "iL6p");
/* harmony import */ var _domain_manager_components_domain_parameter_item_dialog_domain_parameter_item_dialog_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./domain-manager/components/domain-parameter-item-dialog/domain-parameter-item-dialog.component */ "YWCg");
/* harmony import */ var _domain_manager_components_domain_parameters_domain_parameters_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./domain-manager/components/domain-parameters/domain-parameters.component */ "9iYN");
/* harmony import */ var _domain_manager_domain_manager_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./domain-manager/domain-manager.component */ "QAdn");
/* harmony import */ var _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./not-found/not-found.component */ "v2M4");
/* harmony import */ var _pages_routing_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pages-routing.module */ "viRw");
/* harmony import */ var _pages_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./pages.component */ "8D7W");
/* harmony import */ var _search_event_form_form_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./search-event/form/form.component */ "YqEp");
/* harmony import */ var _search_event_search_event_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./search-event/search-event.component */ "Vw/t");
/* harmony import */ var _search_organization_search_organization_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./search-organization/search-organization.component */ "9aCo");
/* harmony import */ var _welcome_welcome_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./welcome/welcome.component */ "+j1i");
/* harmony import */ var _domain_manager_components_discount_manager_discount_manager_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./domain-manager/components/discount-manager/discount-manager.component */ "5smk");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/core */ "fXoL");

























class PagesModule {
}
PagesModule.ɵfac = function PagesModule_Factory(t) { return new (t || PagesModule)(); };
PagesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdefineNgModule"]({ type: PagesModule });
PagesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _material_module__WEBPACK_IMPORTED_MODULE_3__["MaterialModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
            _pages_routing_module__WEBPACK_IMPORTED_MODULE_17__["PagesRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵsetNgModuleScope"](PagesModule, { declarations: [_create_edit_incident_components_add_transmission_dialog_add_transmission_dialog_component__WEBPACK_IMPORTED_MODULE_6__["AddTransmissionDialogComponent"],
        _create_edit_incident_create_edit_incident_component__WEBPACK_IMPORTED_MODULE_10__["CreateEditIncidentComponent"],
        _search_event_form_form_component__WEBPACK_IMPORTED_MODULE_19__["FormComponent"],
        _create_edit_incident_components_incident_attachments_incident_attachments_component__WEBPACK_IMPORTED_MODULE_7__["IncidentAttachmentsComponent"],
        _create_edit_incident_components_incident_summary_incident_summary_component__WEBPACK_IMPORTED_MODULE_8__["IncidentSummaryComponent"],
        _create_edit_incident_components_incident_update_history_incident_update_history_component__WEBPACK_IMPORTED_MODULE_9__["IncidentUpdateHistoryComponent"],
        _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_16__["NotFoundComponent"],
        _pages_component__WEBPACK_IMPORTED_MODULE_18__["PagesComponent"],
        _search_event_search_event_component__WEBPACK_IMPORTED_MODULE_20__["SearchEventComponent"],
        _search_organization_search_organization_component__WEBPACK_IMPORTED_MODULE_21__["SearchOrganizationComponent"],
        _welcome_welcome_component__WEBPACK_IMPORTED_MODULE_22__["WelcomeComponent"],
        _create_edit_incident_components_add_resource_dialog_add_resource_dialog_component__WEBPACK_IMPORTED_MODULE_5__["AddResourceDialogComponent"],
        _create_edit_incident_components_add_organization_dialog_add_organization_dialog_component__WEBPACK_IMPORTED_MODULE_4__["AddOrganizationDialogComponent"],
        _domain_manager_domain_manager_component__WEBPACK_IMPORTED_MODULE_15__["DomainManagerComponent"],
        _domain_manager_components_domain_parameters_domain_parameters_component__WEBPACK_IMPORTED_MODULE_14__["DomainParametersComponent"],
        _domain_manager_components_domain_mappings_domain_mappings_component__WEBPACK_IMPORTED_MODULE_11__["DomainMappingsComponent"],
        _domain_manager_components_domain_parameter_dialog_domain_parameter_dialog_component__WEBPACK_IMPORTED_MODULE_12__["DomainParameterDialogComponent"],
        _domain_manager_components_domain_parameter_item_dialog_domain_parameter_item_dialog_component__WEBPACK_IMPORTED_MODULE_13__["DomainParameterItemDialogComponent"],
        _domain_manager_components_discount_manager_discount_manager_component__WEBPACK_IMPORTED_MODULE_23__["DiscountManagerComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _material_module__WEBPACK_IMPORTED_MODULE_3__["MaterialModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
        _pages_routing_module__WEBPACK_IMPORTED_MODULE_17__["PagesRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"]] }); })();


/***/ }),

/***/ "f+7+":
/*!************************************************************!*\
  !*** ./src/app/core/services/products/products.service.ts ***!
  \************************************************************/
/*! exports provided: ProductsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsService", function() { return ProductsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_api_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @services/api/api.service */ "tpT/");


class ProductsService {
    constructor(apiService) {
        this.apiService = apiService;
        this._endpointURL = '/products';
    }
    getAllProducts() {
        return this.apiService.create(`${this._endpointURL}/light/search`, {
            body: {
                orders: [
                    {
                        identifier: 'code',
                        asc: true,
                    },
                ],
            },
        });
    }
}
ProductsService.ɵfac = function ProductsService_Factory(t) { return new (t || ProductsService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_services_api_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"])); };
ProductsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ProductsService, factory: ProductsService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "s7Wy":
/*!*************************************************************!*\
  !*** ./src/app/core/resolvers/resolver-service.resolver.ts ***!
  \*************************************************************/
/*! exports provided: ResolverService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResolverService", function() { return ResolverService; });
/* harmony import */ var _shared_utils_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/utils/helpers */ "po+y");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_api_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @services/api/api.service */ "tpT/");





/**
 * @example
 * // my-routing.module.ts
 * const routes: Routes = [
 *  {
 *    path: 'rute',
 *    component: MyComponent,
 *    resolve: { resolveProperty: ResolverService },
 *    data: {
 *      resolveItems: [
 *        {
 *          resolveKey: 'countries',
 *          url: '/countries/search',
 *          method: 'post',
 *          body: { orders: [{ identifier: 'name', asc: true }] },
 *        },
 *        {
 *          resolveKey: 'cities',
 *          url: '/cities/search',
 *          method: 'post',
 *          body: { orders: [{ identifier: 'name', asc: true }] },
 *        },
 *      ],
 *    } as ResolveData,
 *  },
 * ];
 *
 * // my-component.component.ts
 * // observable way
 * constructor(private activatedRoute: ActivatedRoute) {
 *   activatedRoute.data.subscribe((resolveProperty) => {
 *    // do something with the data
 *   }
 * }
 *
 * // snapshot way
 * constructor(route: ActivatedRouteSnapshot) {
 *  route.data
 * }
 */
class ResolverService {
    constructor(apiService) {
        this.apiService = apiService;
    }
    resolve(route) {
        const data = route.data;
        const requests = data.resolveItems.map((item) => {
            const constructedUrl = Object(_shared_utils_helpers__WEBPACK_IMPORTED_MODULE_0__["constructUrlWithParams"])(item.url, item.body);
            if (item.method === 'get') {
                return this.apiService.read(constructedUrl);
            }
            else {
                return this.apiService.create(constructedUrl, {
                    body: item.body,
                });
            }
        });
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["forkJoin"])(requests).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((responseList) => {
            const resolverObject = {};
            responseList.forEach((responseData, index) => {
                const resolveKey = data.resolveItems[index].resolveKey;
                resolverObject[resolveKey] = responseData;
            });
            return resolverObject;
        }));
    }
}
ResolverService.ɵfac = function ResolverService_Factory(t) { return new (t || ResolverService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_services_api_api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"])); };
ResolverService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: ResolverService, factory: ResolverService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "v2M4":
/*!********************************************************!*\
  !*** ./src/app/pages/not-found/not-found.component.ts ***!
  \********************************************************/
/*! exports provided: NotFoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotFoundComponent", function() { return NotFoundComponent; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");






function NotFoundComponent_a_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", ctx_r0.path);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 2, "goBack"));
} }
class NotFoundComponent {
    constructor(route) {
        this.route = route;
        this.path = '';
    }
    ngOnInit() {
        this.route.data.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["take"])(1)).subscribe((data) => {
            this.path = data.path;
        });
    }
}
NotFoundComponent.ɵfac = function NotFoundComponent_Factory(t) { return new (t || NotFoundComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"])); };
NotFoundComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: NotFoundComponent, selectors: [["app-not-found"]], decls: 6, vars: 4, consts: [[1, "container"], ["src", "/assets/signal-lost.png", "alt", ""], [1, "title"], ["mat-raised-button", "", "color", "primary", 3, "routerLink", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "routerLink"]], template: function NotFoundComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, NotFoundComponent_a_5_Template, 3, 4, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 2, "notFoundTitle"));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.path);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatAnchor"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslatePipe"]], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n}\n\n.container[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxub3QtZm91bmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUFFO0VBQ0UsZ0JBQUE7QUFFSiIsImZpbGUiOiJub3QtZm91bmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4uY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGhlaWdodDogMTAwJTtcbiAgLnRpdGxlIHtcbiAgICBtYXJnaW4tdG9wOiAycmVtO1xuICB9XG59XG4iXX0= */"] });


/***/ }),

/***/ "viRw":
/*!***********************************************!*\
  !*** ./src/app/pages/pages-routing.module.ts ***!
  \***********************************************/
/*! exports provided: PagesRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagesRoutingModule", function() { return PagesRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _constants_app_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @constants/app-routes */ "cr9A");
/* harmony import */ var _constants_entities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @constants/entities */ "Qcpe");
/* harmony import */ var _resolvers_resolver_service_resolver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @resolvers/resolver-service.resolver */ "s7Wy");
/* harmony import */ var _core_guards_open_tab_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/guards/open-tab.guard */ "OYyA");
/* harmony import */ var _create_edit_incident_create_edit_incident_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./create-edit-incident/create-edit-incident.component */ "6XgC");
/* harmony import */ var _domain_manager_components_discount_manager_discount_manager_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./domain-manager/components/discount-manager/discount-manager.component */ "5smk");
/* harmony import */ var _domain_manager_domain_manager_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./domain-manager/domain-manager.component */ "QAdn");
/* harmony import */ var _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./not-found/not-found.component */ "v2M4");
/* harmony import */ var _pages_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages.component */ "8D7W");
/* harmony import */ var _search_event_search_event_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./search-event/search-event.component */ "Vw/t");
/* harmony import */ var _search_organization_search_organization_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./search-organization/search-organization.component */ "9aCo");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ "fXoL");














const routes = [
    {
        path: _constants_app_routes__WEBPACK_IMPORTED_MODULE_1__["appRoutes"].HOME,
        component: _pages_component__WEBPACK_IMPORTED_MODULE_9__["PagesComponent"],
        canActivateChild: [_core_guards_open_tab_guard__WEBPACK_IMPORTED_MODULE_4__["OpenTabGuard"]],
        children: [
            {
                path: _constants_app_routes__WEBPACK_IMPORTED_MODULE_1__["appRoutes"].DOMAIN_MANAGER,
                component: _domain_manager_domain_manager_component__WEBPACK_IMPORTED_MODULE_7__["DomainManagerComponent"],
            },
            {
                path: `${_constants_entities__WEBPACK_IMPORTED_MODULE_2__["EntityType"].INCIDENT}`,
                children: [
                    {
                        path: ':id',
                        component: _create_edit_incident_create_edit_incident_component__WEBPACK_IMPORTED_MODULE_5__["CreateEditIncidentComponent"],
                    },
                ],
            },
            {
                path: `${_constants_entities__WEBPACK_IMPORTED_MODULE_2__["EntityType"].EVENT}`,
                children: [
                    {
                        path: `${_constants_app_routes__WEBPACK_IMPORTED_MODULE_1__["appRoutes"].SEARCH}/:id`,
                        component: _search_event_search_event_component__WEBPACK_IMPORTED_MODULE_10__["SearchEventComponent"],
                    },
                ],
            },
            {
                path: `${_constants_entities__WEBPACK_IMPORTED_MODULE_2__["EntityType"].ORGANIZATION}`,
                children: [
                    {
                        path: `${_constants_app_routes__WEBPACK_IMPORTED_MODULE_1__["appRoutes"].SEARCH}/:id`,
                        component: _search_organization_search_organization_component__WEBPACK_IMPORTED_MODULE_11__["SearchOrganizationComponent"],
                    },
                ],
            },
            {
                path: `${_constants_entities__WEBPACK_IMPORTED_MODULE_2__["EntityType"].DISCOUNT_MANAGER}`,
                component: _domain_manager_components_discount_manager_discount_manager_component__WEBPACK_IMPORTED_MODULE_6__["DiscountManagerComponent"],
            },
            {
                path: _constants_app_routes__WEBPACK_IMPORTED_MODULE_1__["appRoutes"].NOT_FOUND,
                component: _not_found_not_found_component__WEBPACK_IMPORTED_MODULE_8__["NotFoundComponent"],
                pathMatch: 'full',
            },
        ],
        resolve: {
            masterDataResolver: _resolvers_resolver_service_resolver__WEBPACK_IMPORTED_MODULE_3__["ResolverService"],
        },
        data: {
            resolveItems: [
                {
                    resolveKey: 'countries',
                    url: '/countries/search',
                    method: 'post',
                    body: {
                        orders: [
                            {
                                identifier: 'name',
                                asc: true,
                            },
                        ],
                    },
                },
                {
                    resolveKey: 'cities',
                    url: '/cities/search',
                    method: 'post',
                    body: {
                        orders: [
                            {
                                identifier: 'name',
                                asc: true,
                            },
                        ],
                    },
                },
            ],
        },
    },
];
class PagesRoutingModule {
}
PagesRoutingModule.ɵfac = function PagesRoutingModule_Factory(t) { return new (t || PagesRoutingModule)(); };
PagesRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineNgModule"]({ type: PagesRoutingModule });
PagesRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsetNgModuleScope"](PagesRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "wcYz":
/*!****************************************************************************!*\
  !*** ./src/app/core/services/loyalty-programs/loyalty-programs.service.ts ***!
  \****************************************************************************/
/*! exports provided: LoyaltyProgramsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoyaltyProgramsService", function() { return LoyaltyProgramsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_api_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @services/api/api.service */ "tpT/");


class LoyaltyProgramsService {
    constructor(apiService) {
        this.apiService = apiService;
        this._endpointURL = '/loyalty-program';
    }
    getAllLoyaltyPrograms() {
        return this.apiService.read(`${this._endpointURL}`);
    }
    saveLoyaltyProgramList(listToSave) {
        return this.apiService.create(`${this._endpointURL}/list`, {
            body: listToSave,
        });
    }
}
LoyaltyProgramsService.ɵfac = function LoyaltyProgramsService_Factory(t) { return new (t || LoyaltyProgramsService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_services_api_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"])); };
LoyaltyProgramsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LoyaltyProgramsService, factory: LoyaltyProgramsService.ɵfac, providedIn: 'root' });


/***/ })

}]);
//# sourceMappingURL=pages-pages-module.js.map