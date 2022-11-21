require './lib/file_helper.rb'
require './lib/user_helper.rb'
require 'shoes'

file_helper = FileHelper.new()


Shoes.app title: "DAR Generator", width: 800, height: 600 do
    user_helper = UserHelper.new()

    stack do
        title "Dynamic Animation Replacer Condition Maker"
        subtitle "Easily create your perfect animation setup"
    end

    stack do
        # Gender Input
        flow do
            para "Gender"
            gender_options = list_box items: UserHelper.gender_options
            gender_options.change do
                user_helper.selected_gender = gender_options.text
            end
        end

        # Race Input
        flow do
            para "Race", margin_right: 5
            race_options_radio = button("Select Races") do 
                add_races_window = window do 
                    tagline "Select Races"
                    UserHelper.race_options.each do |race|
                        race_select = check margin: 3; para(race).click do
                            race_select.checked = !race_select.checked?
                            if(race_select.checked?)
                                    user_helper.selected_races.push(race)
                                else
                                    user_helper.selected_races.delete(race)
                                end
                        end
                    end
                    button "Add Races" do
                        add_races_window.close()
                    end

                end
            end
        end

        # Weapon Input
        
        flow do 
            # getting weapon type
            selected_weapon_types_output = para
            weapon_type_radio = button("Add Weapon Types") do
                add_types_window =  window do
                    tagline "Add Weapons From Types"
                    flow do
                        UserHelper.weapon_type_options.keys.each do |weapon|
                            
                            type_select = check margin: 3; para(weapon).click do 
                                type_select.checked = !type_select.checked?
                                if(type_select.checked?)
                                    user_helper.selected_weapon_types.push(weapon)
                                else
                                    user_helper.selected_weapon_types.delete(weapon)
                                end
                            end   

                            if(user_helper.selected_weapon_types.include?(weapon))
                                type_select.checked = true
                            end    
                        end
                    end

                    button "Add types" do
                        add_types_window.close()
                        if (user_helper.selected_weapon_types.length > 0)
                            selected_weapon_types_output.text = user_helper.selected_weapon_types.to_s
                        end
                    end

                end
            end
        end

        # flow do
        #     # WIP
        #     @selected_vanilla_weapons = []
        #     selected_vanilla_weapons_ouput = para
        #     @vanilla_weapons_radio = radio; para("Add Vanilla Weapons").click do
        #         @weapon_type_radio.checked = false
        #         @vanilla_weapons_radio.checked =  !@vanilla_weapons_radio.checked?
        #         @mod_weapons_radio.checked = false
                
        #         @weapon_selection_form.clear
        #         @weapon_selection_form.append() do
        #             para "vanilla"
        #         end

        #     end
        
        # end

        flow do
            # WIP
            @selected_modded_weapons_output = para
            @mod_weapons_button = button("Add Weapons from a Mod").click do
              file = ask_open_file()
              @selected_modded_weapons_output.text = file 
              file_helper.esp_to_xml(file)
              file_helper.get_weapons_from_xml("conversion/ConvertedFile.xml")
            #   finish adding modded weapons
            end
        end

         
        


    



        button "Preview Conditions" do
            @preview_output.clear
             @preview_output.append() do
               
                 para "Current Conditions:"
                 para "Gender: #{user_helper.selected_gender}, Race: #{user_helper.selected_races.to_s}, Weapon Types: #{user_helper.selected_weapon_types.to_s}"
             end
         end
        
        @preview_output = stack do 
        end

    end

    
            

end

    