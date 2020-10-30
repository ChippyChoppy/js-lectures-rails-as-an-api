class AnimalsController < ApplicationController
  before_action :find_animal, only: [:show, :edit, :update, :destroy]

  # GET /animals
  def index
    @animals = Animal.all
    
    # response: HTML
    # render :index
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @animals }
    end
  end

  def new
    @animal = Animal.new
    render :new
  end

  def create
    @animal = Animal.create(animal_params)
    redirect_to animal_path(@animal)
  end

  def show
    render :show
  end

  def edit
    render :edit
  end

  def update
    @animal.update(animal_params)
    redirect_to animal_path(@animal)
  end

  def destroy
    @animal.destroy
    redirect_to animals_path
  end

  private

  def animal_params
    params.require(:animal).permit(:name, :flavor, :age, :image)
  end

  def find_animal
    @animal = Animal.find(params[:id])
  end

end
