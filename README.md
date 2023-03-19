## DAR Condition Creator is currently under development

### WIP

- ~~Add/Exclude Armor~~
- ~~Add/Exclude Spells~~
- Stance Support
- ~~General Weapon Types (all swords, all axes, all dual wield etc.)~~
- Add Misc options (~~Race~~, ~~Gender~~, ~~Level~~, Time of Day etc)
- Backend function to actually create file - ~~Need to keep track of file names~~
- Support for changing file names for merged plugins
- Dry up FileHelper.getItemsFromXML
- ~~Maybe rework the PluginItems checkboxes to be more like the RaceSelection checkboxes~~
- Styling:
  - Weapon Types
  - Drop downs in side menu
  - Home screen
  - Item selection?
  - Change app icon

### Known bugs

- ~~Adding a new esp doesn't update list~~

- ~~Going back and readding the same ESP should auto check all items already in the currentConditions~~

- ~~Unhandled exception when there are no items of selected type in esp~~ - Add custom handling for no items of select type in esp?

- ~~Clicking an item in exclude mode switches back to add mode~~
- ~~Duplicate items being add to the conditions when "check all" is clicked~~
- File name not being added to conditions?
