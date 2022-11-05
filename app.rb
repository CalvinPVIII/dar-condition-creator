require 'lib/file_creator.rb'
require 'lib/user_helper.rb'

creator = FileCreator.new()


Shoes.app title: "DAR Generator", width: 800, height: 600 do
    helper = UserHelper.new()

    stack do
        title "Dynamic Animation Replacer Condition Maker"
        subtitle "Easily create your perfect animation setup"
    end

    stack do
        # Gender Input
        # may want to store this in an array
        flow do
            para "Gender"
            gender_options = list_box items: UserHelper.gender_options
            gender_options.change do
                helper.selected_gender = gender_options.text
            end
        end
        # Race Input
        # may want to store this in an array
        flow do
            para "Race", margin_right: 5
            @race_options = list_box items:  UserHelper.race_options, margin_right: 5
            custom_race_toggle = check margin_right: 5; para "Custom Race", margin_right: 5
            custom_race_toggle.click() do
                if custom_race_toggle.checked? 
                    @custom_race_input.state = "enabled"
                    @race_options.state = "disabled"
                else
                    @custom_race_input.state = "disabled"
                    @race_options.state = "enabled"
                end
            end
            @custom_race_input = edit_line
            @custom_race_input.state = "disabled"
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
                                    helper.selected_weapon_types.push(weapon)
                                else
                                    helper.selected_weapon_types.delete(weapon)
                                end
                            end   

                            if(helper.selected_weapon_types.include?(weapon))
                                type_select.checked = true
                            end    
                        end
                    end

                    button "Add types" do
                        add_types_window.close()
                        if (helper.selected_weapon_types.length > 0)
                            selected_weapon_types_output.text = helper.selected_weapon_types.to_s
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
                # getting race input
                if( @custom_race_input.state == "disabled")
                    helper.selected_race =  @race_options.text
                else
                    helper.selected_race = @custom_race_input.text
                end
                 para "Current Conditions:"
                 para "Gender: #{helper.selected_gender}, Race: #{helper.selected_race}, Weapon Types: #{helper.selected_weapon_types.to_s}"
             end
         end
        
        @preview_output = stack do 
        end

    end

    
            

end

    