package my.web.api;

import java.io.InputStream;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import my.data.Sensor;

public class SensorProxy {

    private String baseUrl;

    //Sensor.properties в src/main/resources
    public SensorProxy() {
        try {
            InputStream in = SensorProxy.class.getResourceAsStream("/Sensor.properties");
            Properties props = new Properties();
            props.load(in);
            baseUrl = props.getProperty("baseUrl");
        } catch (Exception ex) {
            Logger.getLogger(SensorProxy.class.getName()).log(Level.SEVERE, null, ex);
            throw new RuntimeException("Config file not found or incorrect. See log");
        }
    }

    public Sensor getSensor(String type, int id) {
        String url = baseUrl + type + "/get/" + id;
        Client client = ClientBuilder.newClient();
        WebTarget target = client.target(url);
        Sensor sensor = new Sensor(id, type, target.request().get(String.class));
        client.close();
        return sensor;
    }
}