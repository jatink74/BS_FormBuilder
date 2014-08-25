namespace BS_FormBuilder.Web.Migrations
{
    using BS_FormBuilder.Web.Models.Entities;
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedGUIDColumnfortheForm : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Forms", "Guid", c => c.Guid(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Forms", "Guid");
        }
    }
}
