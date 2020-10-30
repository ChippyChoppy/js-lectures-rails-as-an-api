class Api::V1::AnimalsController < ApplicationController

  def index
    animals = Animal.all
    render json: animals, except: [:created_at, :updated_at]
  end

  def create
    animal = Animal.create!(animal_params)
    render json: animal
  end

  def destroy
    animal = Animal.find(params[:id])
    animal.destroy!
    render json: {}
  end

  def update
    animal = Animal.find(params[:id])
    animal.update!(donations: params[:donations])
    render json: animal
  end

  private

  def animal_params
    params.permit(:name, :imageUrl, :description, :donations)
  end
end