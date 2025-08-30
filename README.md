# Uniter for Palestine Website

- [Editing](#editing)
  * [Uploading Files](#uploading-files)
  * [Adding a New Page](#adding-a-new-page)
  * [Editing a Page](#editing-a-page)
  * [Removing a Page](#removing-a-page)
  * [FAQs](#faqs)
- [Developers](#developers)
  * [Develop](#develop)
  * [Publish](#publish)

## Editors
Please contact us if you wish to become an editor.

### Uploading Files
To upload PDFs, images, and other documents:

1. **Navigate to the `/asset` Directory:** In your GitHub repository, find the directory named `/asset`, where you will upload your files.

2. **Click the `Add file` Button:** Look for the green button labeled **Add file**. Click on it, and a dropdown menu will appear.

3. **Select `Upload files`:** From the dropdown, select **Upload files** to access the upload interface.

4. **Choose Your Files:** You can either drag and drop files directly into the upload area or click the **choose your files** link to open a file selection dialog.

5. **Optional: Explain Your Changes:** There is a text box where you can explain what changes you made and why, which is helpful for others who may look at the file history later.

6. **Press the `Commit changes` Button:** After uploading your files, scroll down and click the green **Commit changes** button to save your uploads.

### Adding a New Page
To create a new page in your repository:

1. **Navigate to the Correct Directory:** Go to the directory where you want to add the new page.

2. **Click the `Add file` Button:** Click on the **Add file** button and select **Create new file** from the dropdown.

3. **Name the File:** Enter a name for your file in the input box, ensuring you use the `.md` extension (for example, `my_file_name.md`), which tells GitHub that it is a Markdown file. If you create a file named `about.md` in the `/en` directory, it will create a page accessible at `/en/about`.

4. **Edit the Contents of the Page:** Use the text editor to write the content you want for this page, utilizing Markdown syntax for formatting text.

5. **Press the `Commit changes` Button:** Once you’re done editing, click the **Commit changes** button to save your new page.

6. **Optional: Describe Your Changes:** In the dialog box, you can provide a brief explanation of what this new page is about and any changes you made.

### Editing a Page
To modify an existing page:

1. **Navigate to the Correct Directory:** Find the directory containing the page you want to edit.

2. **Click the File You Want to Edit:** Click on the filename of the page you wish to change.

3. **Press the Pencil Icon:** In the upper right corner of the file view, click the pencil icon (✏️) to open the file in edit mode.

4. **Start Editing the File:** Make your changes in the text editor.

5. **Press the `Commit changes` Button:** After making your edits, click the **Commit changes** button to save your updates.

6. **Optional: Explain Your Changes:** Use the text box to describe what changes you made and why they are important.

### Removing a Page
To delete a page:

1. **Navigate to the Correct Directory:** Go to the directory where the file you want to remove is located.

2. **Click the File You Want to Remove:** Select the file by clicking on its name.

3. **Press the `...` Button:** Click the `...` button (more options) and select **Delete file** from the dropdown menu.

4. **Press the `Commit changes` Button:** After confirming the deletion, click the **Commit changes** button to finalize the removal.

5. **Optional: Explain the Reason for Deletion:** You can provide a brief explanation of why you decided to remove this page.

### FAQs
1. **Can I revert changes?** Yes! You can revert to a previous version of a file by navigating to the file, clicking on the **History** button, selecting the commit you want to revert to, and then clicking **Revert**.

2. **What if I make a mistake while editing?** If you realize you've made an error after committing, you can always edit the file again to make the necessary corrections.

## Developers

### Develop

1. Make sure you have a recent version of **node** and **npm** installed.
2. Clone the project.
3. Navigate to the project *root* directory.
4. Run `npx @11ty/eleventy --serve --watch` for a server.
5. Start editing the site.

### Publish

1. Navigate to the project *root* directory.
2. Run `npx @11ty/eleventy --output docs`.
3. `git add docs` and `git commit`.
4. `git push`

