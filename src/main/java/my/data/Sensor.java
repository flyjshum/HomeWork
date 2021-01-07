package my.data;

public class Sensor {

    private int id;
    private String type;
    private String value;  //в зависимости от типа сенсора, используем корректный url удаленного WebApi

    public Sensor() {
    }

    public Sensor(int id, String type, String value) {
        this.id = id;
        this.type = type;
        this.value = value;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "Sensor{" + "id=" + id + ", type=" + type + ", value=" + value + '}';
    }
}
