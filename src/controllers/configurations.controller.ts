import { Response, Request, Application } from "express";
import database from "../db";
import { ConfigurationDatabaseEntity } from "../entity/configurations.entity";
import { ConfigurationsService } from "../services/configurations.service";

export class ConfigurationsController {
  private configurationsService: ConfigurationsService;

  constructor(app: Application) {
    this.configurationsService = new ConfigurationsService(
      ConfigurationDatabaseEntity,
      database
    );
    this.registerRoutes(app);
  }

  private registerRoutes(app: Application) {
    app.get("/configurations", this.getConfiguration.bind(this));
  }

  public async getConfiguration(_req: Request, res: Response) {
    try {
      const configuration = await this.configurationsService.get();
      res.status(200).json({ configuration });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
