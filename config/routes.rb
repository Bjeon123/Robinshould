Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'
  namespace :api , defaults: {format: :json} do
    resources :users, only: [:create, :show, :update] do 
      resources :stocks, only: [:index]
      resources :holdings, only:[:index]
    end
    resources :watchlists, only:[:index,:create,:destroy,:update]
    resources :watchlist_joins, only:[:create,:destroy]
    resources :holdings, only:[:index, :create,:destroy,:update]
    get "stocks/:id", to: "stocks#show"
    get "search/stocks/:input", to: "stocks#search"
    resource :session, only: [:create, :destroy]
  end

end
