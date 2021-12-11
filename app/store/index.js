
export const state = () => ({
  showSkeleton: false,
  showSidebar: false,
  token: null,
  lang: 'ru',
  vocabulary:{
    'ru':{
      'saved': 'Сохранено',
      'save': 'Сохранить изменения',
      'edit_name_group': 'Редактировать имя группы',
      'placeholder_search': 'Поиск',
      'prefix_sort': 'Показать',
      'add_new_group': 'Добавить новую группу',
      'add_new_role': 'Добавить новую роль',
      'title_page_groups': 'Роли',
      'title_page_role': 'Редактировать роль',
      "permission": 'Права доступа',
      "open": 'Открыть',
      'lang': 'English',
      'search': 'Поиск',
      'close': 'Закрыть'
    },
    'en':{
      'saved': 'Saved',
      'save': 'Save',
      'edit_name_group': 'Edit group name',
      'placeholder_search': 'Search',
      'prefix_sort': 'Show',
      'add_new_group': 'Add New Group',
      'add_new_role': 'Add New Role',
      'title_page_groups': 'Roles',
      'title_page_role': 'Edit role',
      "permission": 'Permission',
      "open": 'Open',
      'lang': 'Русский',
      'search': 'Search',
      'close': 'Close'
    },
  },
});


export const mutations = {
  setShowSkeleton(state, value){
    state.showSkeleton = value;
  },
  setShowSidebar(state, value){
    state.showSidebar = value;
  },
  setToken(state, value){
    state.token = value;
  }
}
