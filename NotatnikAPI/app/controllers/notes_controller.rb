class NotesController < ApplicationController
  before_action :set_note, only: %i[ show update destroy ]

  # GET /notes
  def index
    @notes = Note.all

    render json: @notes
  end

  # GET /notes/1
  def show
    render json: @note
  end

  # POST /notes
  def create
    @user = User.find(params[:user_id])  # Znajdujesz użytkownika na podstawie parametru user_id
    @note = @user.notes.build(note_params)  # Tworzysz nową notatkę powiązaną z tym użytkownikiem
    
    if @note.save
      redirect_to user_note_url(@user, @note), notice: 'Notatka została pomyślnie utworzona.'  # Przekierowujesz z user_id i note_id
    else
      render :new
    end
  end

  # PATCH/PUT /notes/1
  def update
    if @note.update(note_params)
      render json: @note
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  # DELETE /notes/1
  def destroy
    @note.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_note
      @note = Note.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def note_params
      params.require(:note).permit(:title, :content, :user_id)
    end
end
