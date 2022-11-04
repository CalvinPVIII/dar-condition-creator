require('lib/file_creator.rb')

creator = FileCreator.new()

weapon_types = {"Fists":0, "Swords":1, "Daggers":2, "War Axes":3, "Maces":4, "Greatswords":5, "Battleaxes":6, "Bows":7, "Staff":8, "Crossbows":9, "Warhammers":10}


Shoes.app title: "DAR Generator", width: 800, height: 600 do

    stack do
        title "Dynamic Animation Replacer Condition Maker"
        subtitle "Easily create your perfect animation setup"
    end

    stack do
        # Gender Input
        @selected_gender = "Any Gender"
        flow do
            para "Gender"
            gender_options = list_box items: ["Any Gender", "Male", "Female"]
            gender_options.change do
                @selected_gender = gender_options.text
            end
        end
        # Race Input
        flow do
            para "Race", margin_right: 5
            @race_options = list_box items: ["Any Race",'Argonian', 'Dark Elf', 'High Elf', 'Imperial', 'Khajiit', 'Nord', 'Orc', 'Redguard', 'Wood Elf'], margin_right: 5
            custom_race_toggle = check margin_right: 5; para "Custom Race", margin_right: 5
            custom_race_toggle.click() do
                if custom_race_toggle.checked? 
                    custom_race_input.state = "enabled"
                    @race_options.state = "disabled"
                else
                    custom_race_input.state = "disabled"
                    @race_options.state = "enabled"
                end
            end
            custom_race_input = edit_line
            custom_race_input.state = "disabled"
        end

        # Weapon Input
        
        flow do 
            # getting weapon type
            
            # currently might only be scoped to this flow block
            selected_weapon_types = []


            selected_weapon_types_output = para
            weapon_type_radio = button("Add Weapon Types") do
                add_types_window =  window do
                    tagline "Add Weapons From Types"
                    flow do
                        weapon_types.keys.each do |weapon|
                            
                            type_select = check margin: 3; para(weapon).click do 
                                type_select.checked = !type_select.checked?
                                if(type_select.checked?)
                                    selected_weapon_types.push(weapon)
                                else
                                    selected_weapon_types.delete(weapon)
                                end
                            end   

                            if(selected_weapon_types.include?(weapon))
                                type_select.checked = true
                            end    
                        end
                    end

                    button "Add types" do
                        add_types_window.close()
                        if (selected_weapon_types.length > 0)
                            selected_weapon_types_output.text = selected_weapon_types.to_s
                        end
                    end

                end
            end
        end

        flow do
            # WIP
            @selected_vanilla_weapons = []
            selected_vanilla_weapons_ouput = para
            @vanilla_weapons_radio = radio; para("Add Vanilla Weapons").click do
                @weapon_type_radio.checked = false
                @vanilla_weapons_radio.checked =  !@vanilla_weapons_radio.checked?
                @mod_weapons_radio.checked = false
                
                @weapon_selection_form.clear
                @weapon_selection_form.append() do
                    para "vanilla"
                end

            end
        
        end

        flow do
            # WIP
            @mod_weapons_radio = radio; para("Add Weapons from a Mod").click do
                @weapon_type_radio.checked = false
                @vanilla_weapons_radio.checked =  false
                @mod_weapons_radio.checked = !@mod_weapons_radio.checked?
                
                @weapon_selection_form.clear
                @weapon_selection_form.append() do
                    para "modded"
                end
            end
        end

         
        


    



        button "Preview Conditions" do
            @preview_output.clear
             @preview_output.append() do
                 para "Current Conditions:"
                 para "Gender: #{@selected_gender}, Race: #{@race_options.text}, Weapon Types: currently need to fix scoping issue"
             end
         end
        
        @preview_output = stack do 
        end

    


         


    end

    
            

end

    