namespace BS_FormBuilder.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FontSupportAdded : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Forms", "OpenDialogBtnFont", c => c.String(true, 200));
            AddColumn("dbo.Forms", "OpenDialogBtnFontSize", c => c.String(true, 20));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Forms", "OpenDialogBtnFontSize");
            DropColumn("dbo.Forms", "OpenDialogBtnFont");
        }
    }
}
