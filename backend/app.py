from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import random

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///network.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
class Device(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    ip_address = db.Column(db.String(50))

class Traffic(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    traffic = db.Column(db.Float, nullable=False)
    download = db.Column(db.Float, default=180)
    upload = db.Column(db.Float, default=52)
    unit = db.Column(db.String(20), default="Mbps")
    status = db.Column(db.String(20), default="Normal")

class Alert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    alerts = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), default="Active")

class TrafficHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    traffic = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.String(50))    

class Settings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    monitoring = db.Column(db.Boolean, default=True)
    live_updates = db.Column(db.Boolean, default=True)
    alert_system = db.Column(db.Boolean, default=True)
    refresh_interval = db.Column(db.Integer, default=3)    

@app.route("/")
def home():
    return jsonify({
        "message": "NetWatch Backend is running!"
    })


@app.route("/api/devices")
def devices():
    all_devices = Device.query.all()

    total_devices = len(all_devices)
    online = len([d for d in all_devices if d.status == "Online"])
    offline = total_devices - online

    return jsonify({
    "total_devices": total_devices,
    "online": online,
    "offline": offline,
    "health": round((online / total_devices) * 100) if total_devices > 0 else 0
})
@app.route("/api/device-list")
def device_list():
    devices = Device.query.all()

    return jsonify([
        {
            "id": d.id,
            "name": d.name,
            "status": d.status,
            "ip_address": d.ip_address
        }
        for d in devices
    ])

@app.route("/api/traffic")
def traffic_data():
    traffic = Traffic.query.order_by(Traffic.id.desc()).first()

    return jsonify({
    "traffic": traffic.traffic,
    "download": traffic.download,
    "upload": traffic.upload,
    "unit": traffic.unit,
    "status": traffic.status
})
@app.route("/api/traffic-history")
def traffic_history():
    history_data = TrafficHistory.query.order_by(TrafficHistory.id.asc()).all()

    if history_data:
        history_data[-1].traffic = random.randint(20, 90)
        db.session.commit()

    return jsonify({
        "history": [item.traffic for item in history_data]
    })
@app.route("/api/alerts")
def alerts_data():
    alert = Alert.query.order_by(Alert.id.desc()).first()

    return jsonify({
        "alerts": alert.alerts,
        "status": alert.status
    })
@app.route("/api/nodes")
def nodes_data():
    return jsonify({
        "Internet": {
            "devices": "--",
            "status": "Connected",
            "traffic": "Normal",
            "response": "--"
        },
        "Main Router": {
            "devices": "--",
            "status": "Healthy",
            "traffic": "Normal",
            "response": "18 ms"
        },
        "Computer Lab A": {
            "devices": 42,
            "status": "Healthy",
            "traffic": "Normal",
            "response": "18 ms"
        },
        "Library": {
            "devices": 31,
            "status": "Healthy",
            "traffic": "Normal",
            "response": "22 ms"
        },
        "Computer Lab B": {
            "devices": 56,
            "status": "Warning",
            "traffic": "High",
            "response": "35 ms"
        }
    })
@app.route("/api/settings")
def get_settings():
    settings = Settings.query.first()

    return jsonify({
        "monitoring": settings.monitoring,
        "live_updates": settings.live_updates,
        "alert_system": settings.alert_system,
        "refresh_interval": settings.refresh_interval
    })
@app.route("/api/settings", methods=["POST"])
def update_settings():
    settings = Settings.query.first()
    data = request.json

    settings.monitoring = data.get("monitoring", settings.monitoring)
    settings.live_updates = data.get("live_updates", settings.live_updates)
    settings.alert_system = data.get("alert_system", settings.alert_system)
    settings.refresh_interval = data.get(
        "refresh_interval",
        settings.refresh_interval
    )

    db.session.commit()

    return jsonify({
        "message": "Settings updated successfully"
    })
with app.app_context():
    db.create_all()
    
with app.app_context():
   if Device.query.count() == 0:
    devices_data = [
        Device(name="Computer Lab A", status="Online", ip_address="192.168.1.101"),
        Device(name="Computer Lab B", status="Online", ip_address="192.168.1.102"),
        Device(name="Library", status="Online", ip_address="192.168.1.103"),
        Device(name="Main Router", status="Online", ip_address="192.168.1.1")
    ]

    for i in range(5, 129):
        status = "Online" if i <= 121 else "Offline"

        devices_data.append(
            Device(
                name=f"College PC-{i:03d}",
                status=status,
                ip_address=f"192.168.1.{i}"
            )
        )

    db.session.add_all(devices_data)
    db.session.commit()


with app.app_context():
    if Traffic.query.count() == 0:
        traffic_data = Traffic(
    traffic=64,
    download=180,
    upload=52,
    unit="Mbps",
    status="Normal"
)
        db.session.add(traffic_data)
        db.session.commit()
with app.app_context():
    if Alert.query.count() == 0:
        alert_data = Alert(
            alerts=3,
            status="Active"
        )
        db.session.add(alert_data)
        db.session.commit()
with app.app_context():
    if TrafficHistory.query.count() == 0:
        history_data = [
            TrafficHistory(traffic=35, timestamp="1"),
            TrafficHistory(traffic=55, timestamp="2"),
            TrafficHistory(traffic=25, timestamp="3"),
            TrafficHistory(traffic=70, timestamp="4"),
            TrafficHistory(traffic=45, timestamp="5"),
            TrafficHistory(traffic=60, timestamp="6"),
            TrafficHistory(traffic=30, timestamp="7"),
            TrafficHistory(traffic=75, timestamp="8"),
            TrafficHistory(traffic=50, timestamp="9"),
            TrafficHistory(traffic=65, timestamp="10"),
            TrafficHistory(traffic=40, timestamp="11"),
            TrafficHistory(traffic=80, timestamp="12")
        ]

        db.session.add_all(history_data)
        db.session.commit()
with app.app_context():
    if Settings.query.count() == 0:
        settings_data = Settings(
            monitoring=True,
            live_updates=True,
            alert_system=True,
            refresh_interval=3
        )
        db.session.add(settings_data)
        db.session.commit()        
if __name__ == "__main__":
    app.run(debug=True)       