class UserHelper
  @@weapon_type_options = {"Fists":0, "Swords":1, "Daggers":2, "War Axes":3, "Maces":4, "Greatswords":5, "Battleaxes":6, "Bows":7, "Staff":8, "Crossbows":9, "Warhammers":10}
  @@gender_options = ["Any Gender", "Male", "Female"]
  @@race_options = ["Any Race",'Argonian', 'Dark Elf', 'High Elf', 'Imperial', 'Khajiit', 'Nord', 'Orc', 'Redguard', 'Wood Elf']


  def initialize
    @selected_weapon_types = []
    #  Change these to arrays 
    @selected_gender = "Any Gender"
    @selected_race = "Any Race"
  end

  def selected_weapon_types
    @selected_weapon_types
  end

  def selected_gender
    @selected_gender
  end

  def selected_race
    @selected_race
  end

   def selected_gender=(input)
    @selected_gender=input
  end

  def selected_race=(input)
    @selected_race=input
  end

  def self.weapon_type_options
    @@weapon_type_options
  end

  def self.gender_options
    @@gender_options
  end
  
  def self.race_options
    @@race_options
  end

 end