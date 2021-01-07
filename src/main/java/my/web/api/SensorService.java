package my.web.api;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;
import javax.annotation.Resource;
import javax.enterprise.concurrent.ManagedExecutorService;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import my.data.Sensor;

@Path("api")
public class SensorService {

    @Resource
    ManagedExecutorService mes;

    @Path("/getSensorsById")
    @GET
    public List<Sensor> getListSensors(@QueryParam("type") String type, @QueryParam("id") List<Integer> listId) {
        List<Sensor> result = new ArrayList<>();
        List<CompletableFuture<Sensor>> futures = new ArrayList<>();

        listId.forEach((id) -> {
            futures.add(CompletableFuture.supplyAsync(() -> getSensor(type, id), mes));
        });

        result = futures.stream()
                .map(CompletableFuture::join)
                .collect(Collectors.toList());
        return result;
    }

    private Sensor getSensor(String type, int id) {
        SensorProxy proxy = new SensorProxy();
        return proxy.getSensor(type, id);
    }
}
