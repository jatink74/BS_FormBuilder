namespace BS_FormBuilder.Web.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ModalButtonColorSelections : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Forms", "OpenDialogBtnBackground", c => c.String());
            AddColumn("dbo.Forms", "OpenDialogBtnForeground", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Forms", "OpenDialogBtnForeground");
            DropColumn("dbo.Forms", "OpenDialogBtnBackground");
        }
    }
}
