/* Список компонентов для модальных форм */
export const listComponents = {
  'edit_offer': markRaw(defineAsyncComponent(() => import(`./prod/offers/edit_offer.vue`))),
  'edit_categories': markRaw(defineAsyncComponent(() => import(`./guides/categories/edit_categories.vue`))),
  'modal_name': markRaw(defineAsyncComponent(() => import(`./modals/modal_name.vue`))),
  'modal_confirm': markRaw(defineAsyncComponent(() => import(`./modals/modal-configrm.vue`))),
  'edit_user': markRaw(defineAsyncComponent(() => import(`./users/edit_user.vue`))),
  'edit_type_docs': markRaw(defineAsyncComponent(() => import(`./guides/type_docs/edit_type_docs.vue`))),
  'edit_cpa': markRaw(defineAsyncComponent(() => import(`./guides/cpa/edit_cpa.vue`))),
  'edit_site': markRaw(defineAsyncComponent(() => import(`./guides/sites/edit_site.vue`))),
  'edit_types_period': markRaw(defineAsyncComponent(() => import(`./guides/types_period/edit_type_period.vue`))),
  'edit_method_get_money': markRaw(defineAsyncComponent(() => import(`./guides/method_get_money/edit_method_get_money.vue`))),
  'edit_type_profit': markRaw(defineAsyncComponent(() => import(`./guides/type_profit/edit_type_profit.vue`))),
  'edit_organization': markRaw(defineAsyncComponent(() => import(`./prod/organizations/edit_organization.vue`))),
  'add_image': markRaw(defineAsyncComponent(() => import(`./modals/modal-add-image.vue`))),
  'control_image': markRaw(defineAsyncComponent(() => import(`./modals/modal-control-images.vue`))),
}